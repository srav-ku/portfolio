import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Unsubscribe,
  collection,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SiteContent } from '@shared/contentSchema';

const COLLECTION_NAME = 'portfolio';

// Section names that correspond to document IDs
const SECTION_NAMES = [
  'personalInfo',
  'socialLinks', 
  'navigation',
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'contact'
] as const;

export type SectionName = typeof SECTION_NAMES[number];

export class SectionedFirestoreService {
  private unsubscribers: Map<string, Unsubscribe> = new Map();

  /**
   * Save a specific section to its own document
   */
  async saveSection(sectionName: SectionName, sectionData: any): Promise<boolean> {
    try {
      console.log(`🔄 Saving ${sectionName} section...`);
      console.log(`📋 Section data keys:`, Object.keys(sectionData || {}));
      
      const docRef = doc(db, COLLECTION_NAME, sectionName);
      const saveData = {
        ...sectionData, // Save ALL fields from the section
        lastModified: new Date().toISOString(),
        version: '1.0.0',
        sectionName
      };
      
      await setDoc(docRef, saveData, { merge: false }); // Use merge: false to replace entire document
      
      console.log(`✅ Successfully saved ${sectionName} section`);
      return true;
    } catch (error) {
      console.error(`❌ Error saving ${sectionName} section:`, error);
      return false;
    }
  }

  /**
   * Save all sections of content to separate documents
   */
  async saveAllSections(content: SiteContent): Promise<boolean> {
    try {
      console.log('🔄 Saving all sections to separate documents...');
      
      const promises = SECTION_NAMES.map(async (sectionName) => {
        const sectionData = content[sectionName];
        if (sectionData) {
          return this.saveSection(sectionName, sectionData);
        }
        return true;
      });

      const results = await Promise.all(promises);
      const allSuccessful = results.every(result => result === true);
      
      if (allSuccessful) {
        console.log('✅ All sections saved successfully!');
      } else {
        console.error('❌ Some sections failed to save');
      }
      
      return allSuccessful;
    } catch (error) {
      console.error('❌ Error saving all sections:', error);
      return false;
    }
  }

  /**
   * Load a specific section from its document
   */
  async loadSection(sectionName: SectionName): Promise<any | null> {
    try {
      console.log(`📥 Loading ${sectionName} section...`);
      
      const docRef = doc(db, COLLECTION_NAME, sectionName);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Remove metadata and return just the section data
        const { lastModified, version, sectionName: _, ...sectionData } = data;
        console.log(`✅ Loaded ${sectionName} with fields:`, Object.keys(sectionData));
        return sectionData;
      }
      
      console.log(`ℹ️  No document found for ${sectionName}`);
      return null;
    } catch (error) {
      console.error(`❌ Error loading ${sectionName} section:`, error);
      return null;
    }
  }

  /**
   * Load all sections and reconstruct the complete SiteContent
   */
  async loadAllSections(): Promise<SiteContent | null> {
    try {
      console.log('📥 Loading all sections from separate documents...');
      
      const sections: Partial<SiteContent> = {};
      
      for (const sectionName of SECTION_NAMES) {
        const sectionData = await this.loadSection(sectionName);
        if (sectionData) {
          sections[sectionName] = sectionData;
        }
      }
      
      // Check if we have any data
      const sectionKeys = Object.keys(sections);
      if (sectionKeys.length === 0) {
        console.log('ℹ️  No sections found in database');
        return null;
      }
      
      console.log(`✅ Loaded ${sectionKeys.length} sections:`, sectionKeys);
      return sections as SiteContent;
    } catch (error) {
      console.error('❌ Error loading all sections:', error);
      return null;
    }
  }

  /**
   * Subscribe to changes in a specific section
   */
  subscribeToSection(sectionName: SectionName, callback: (data: any) => void): void {
    const docRef = doc(db, COLLECTION_NAME, sectionName);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const { lastModified, version, sectionName: _, ...sectionData } = data;
        callback(sectionData);
      } else {
        callback(null);
      }
    });

    this.unsubscribers.set(sectionName, unsubscribe);
  }

  /**
   * Subscribe to all sections for real-time updates
   */
  subscribeToAllSections(callback: (content: SiteContent | null) => void): void {
    let sectionData: Partial<SiteContent> = {};
    let loadedSections = 0;
    const totalSections = SECTION_NAMES.length;

    SECTION_NAMES.forEach((sectionName) => {
      this.subscribeToSection(sectionName, (data) => {
        if (data) {
          sectionData[sectionName] = data;
        } else {
          delete sectionData[sectionName];
        }
        
        loadedSections = Object.keys(sectionData).length;
        
        // Only call callback if we have some data
        if (loadedSections > 0) {
          callback(sectionData as SiteContent);
        } else {
          callback(null);
        }
      });
    });
  }

  /**
   * Unsubscribe from all section listeners
   */
  unsubscribeFromAllSections(): void {
    this.unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.unsubscribers.clear();
  }

  /**
   * Get metadata for all sections
   */
  async getAllSectionsMetadata(): Promise<Record<string, any>> {
    try {
      const metadata: Record<string, any> = {};
      
      for (const sectionName of SECTION_NAMES) {
        const docRef = doc(db, COLLECTION_NAME, sectionName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          metadata[sectionName] = {
            lastModified: data.lastModified,
            version: data.version,
            exists: true
          };
        } else {
          metadata[sectionName] = {
            exists: false
          };
        }
      }
      
      return metadata;
    } catch (error) {
      console.error('❌ Error getting sections metadata:', error);
      return {};
    }
  }

  /**
   * Check if content exists (any section has data)
   */
  async contentExists(): Promise<boolean> {
    try {
      for (const sectionName of SECTION_NAMES) {
        const docRef = doc(db, COLLECTION_NAME, sectionName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('❌ Error checking if content exists:', error);
      return false;
    }
  }
}

export const sectionedFirestoreService = new SectionedFirestoreService();

// Make available globally for debugging
(window as any).sectionedFirestoreService = sectionedFirestoreService;

console.log('🔧 Sectioned Firestore service loaded!');
console.log('Available sections:', SECTION_NAMES.join(', '));