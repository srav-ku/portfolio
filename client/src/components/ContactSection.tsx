import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useContactContent, usePersonalInfo } from '@/contexts/ContentContext';
import { useState } from 'react';

export default function ContactSection() {
  const contactContent = useContactContent();
  const personalInfo = usePersonalInfo();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Check if Web3Forms access key is available
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setSubmitStatus('error');
        setSubmitMessage('Contact form is not properly configured. Please email me directly.');
        setIsSubmitting(false);
        return;
      }
      
      // Create form object for JSON submission (more reliable than FormData)
      const formPayload = {
        access_key: accessKey,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: 'Portfolio Contact Form',
        replyto: formData.email
      };
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thanks for reaching out! Your message has been sent successfully. I'll get back to you soon.");
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Something went wrong while sending your message. Please try again or email me directly.');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmitMessage('Unable to connect to the email service. Please email me directly.');
      } else {
        setSubmitMessage('Something went wrong while sending your message. Please try again or email me directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="min-h-screen-safe section-padding section-spacing pt-20 lg:pt-24 overflow-x-clip">
      <div className="mx-auto w-full max-w-screen-md px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">{contactContent.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          <p className="text-fluid-lg lg:text-fluid-xl text-muted-foreground mt-4 sm:mt-6 max-w-2xl">
            {contactContent.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 md:p-8 h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20 overflow-hidden min-w-0">
              <h3 className="text-2xl font-semibold mb-6">{contactContent.emailCard.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {contactContent.description}
              </p>
              
              <div className="space-y-4 mb-8">
                {contactContent.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{point.text}</span>
                  </div>
                ))}
              </div>

              {/* Email Me Card */}
              <Card 
                className="p-4 sm:p-6 hover-elevate cursor-pointer transition-all" 
                onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Email Me</h4>
                    <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 md:p-8 h-full overflow-hidden min-w-0">
              <h3 className="text-xl font-semibold mb-6">{contactContent.form.title}</h3>
              
              <form className="space-y-6 max-w-full min-w-0" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                  <div className="min-w-0">
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      {contactContent.form.fields.firstName.label}
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={contactContent.form.fields.firstName.placeholder}
                      data-testid="input-first-name"
                      className="w-full max-w-full"
                      required
                    />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      {contactContent.form.fields.lastName.label}
                    </label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={contactContent.form.fields.lastName.placeholder}
                      data-testid="input-last-name"
                      className="w-full max-w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={contactContent.form.fields.email.placeholder}
                    data-testid="input-email"
                    className="w-full max-w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={contactContent.form.fields.subject.placeholder}
                    data-testid="input-subject"
                    className="w-full max-w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={contactContent.form.fields.message.placeholder}
                    rows={4}
                    data-testid="input-message"
                    className="w-full max-w-full"
                    required
                  />
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{submitMessage}</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{submitMessage}</p>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {contactContent.form.submitButton.text}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}