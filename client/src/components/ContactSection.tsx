import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, ArrowRight } from 'lucide-react';
import { useContactContent, usePersonalInfo } from '@/contexts/ContentContext';

export default function ContactSection() {
  const contactContent = useContactContent();
  const personalInfo = usePersonalInfo();
  return (
    <section className="min-h-screen-safe section-padding section-spacing pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
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
                className="p-6 hover-elevate cursor-pointer transition-all" 
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
            <Card className="p-8 h-full">
              <h3 className="text-xl font-semibold mb-6">{contactContent.form.title}</h3>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      {contactContent.form.fields.firstName.label}
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder={contactContent.form.fields.firstName.placeholder}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      {contactContent.form.fields.lastName.label}
                    </label>
                    <Input 
                      id="lastName" 
                      placeholder={contactContent.form.fields.lastName.placeholder}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="Project inquiry"
                    data-testid="input-subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project..."
                    rows={4}
                    data-testid="input-message"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {contactContent.form.submitButton.text}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}