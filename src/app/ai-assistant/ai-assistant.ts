import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Openai } from '../openai/services/openai';

@Component({
  selector: 'app-ai-assistant',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.css',
  encapsulation: ViewEncapsulation.None
})
export class AiAssistant {
  /*@ViewChild('chatInput') chatInput!: ElementRef;
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('typingIndicator') typingIndicator!: ElementRef;*/

  @ViewChild('chatTextarea') chatTextarea!: ElementRef<HTMLTextAreaElement>;

  chatMessages: { content: string; sender: 'user' | 'ai'; time: string }[] = [];
  isAiTyping = false;
  userInput = '';
  showPrompts = true;

  conversation: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
    { role: 'system', content: 'You are a helpful nutrition assistant.' }
  ];


  constructor(private openAi: Openai) { }

  /*adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  handleKeyDown(event: KeyboardEvent, textarea: HTMLTextAreaElement) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
      this.adjustTextareaHeight(textarea);
    }
  }*/
  adjustTextareaHeight(event?: Event) {
    //const textarea = this.chatTextarea.nativeElement;
    const textarea = event?.target as HTMLTextAreaElement;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
      this.adjustTextareaHeight();
    }
  }

  /*sendMessage() {
    const message = this.chatInput.nativeElement.value.trim();
    if (!message || this.isAiTyping) return;

    this.addMessage(message, 'user');
    this.chatInput.nativeElement.value = '';
    this.chatInput.nativeElement.style.height = 'auto';

    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const aiResponse = this.generateAIResponse(message);
      this.addMessage(aiResponse, 'ai');
    }, 1500 + Math.random() * 2000);
  }*/
  sendMessage2() {
    const message = this.userInput.trim();
    if (!message || this.isAiTyping) return;

    this.addMessage(message, 'user');
    this.userInput = '';
    this.showPrompts = false;

    this.isAiTyping = true;
    setTimeout(() => {
      const aiResponse = this.generateAIResponse(message);
      this.addMessage(aiResponse, 'ai');
      this.isAiTyping = false;
    }, 1500 + Math.random() * 2000);
  }

  async sendMessage() {
    const message = this.userInput.trim();
    if (!message || this.isAiTyping) return;

    const userMessage: { role: 'user'; content: string } = {
      role: 'user',
      content: message
    };
    this.conversation.push(userMessage);
    this.addMessage(message, 'user');
    this.userInput = '';
    this.showPrompts = false;
    this.isAiTyping = true;

    try {
      const response = await this.openAi.getChatCompletion(this.conversation);
      this.conversation.push({ role: 'assistant', content: response });
      this.addMessage(response, 'ai');
      console.log("Response: ", response)
    } catch (error) {
      this.addMessage('❌ Error al obtener respuesta de la IA.', 'ai');
    } finally {
      this.isAiTyping = false;
    }
  }

  sendSuggestedMessage(message: string) {
    this.userInput = message;
    this.sendMessage();
  }

  /*addMessage(content: string, sender: 'user' | 'ai') {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    const avatar = sender === 'user' ? '👤' : '🤖';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    div.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        ${content}
        <div class="message-time">${time}</div>
      </div>
    `;

    this.chatMessages.nativeElement.appendChild(div);
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }*/
  addMessage(content: string, sender: 'user' | 'ai') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatMessages.push({ content, sender, time });
  }

  /*showTypingIndicator() {
    this.isAiTyping = true;
    this.typingIndicator.nativeElement.classList.add('show');
  }

  hideTypingIndicator() {
    this.isAiTyping = false;
    this.typingIndicator.nativeElement.classList.remove('show');
  }*/

  generateAIResponse(message: string): string {
    const msg = message.toLowerCase();
    if (msg.includes('breakfast')) {
      return `🍳 For a healthy breakfast, I recommend:\n\n• Greek yogurt with berries\n• Oatmeal with nuts\n• Eggs with vegetables`;
    } else if (msg.includes('weight loss')) {
      return `🎯 For healthy weight loss:\n\n• Moderate calorie deficit\n• Protein-focused meals\n• Hydration and vegetables`;
    } else if (msg.includes('muscle')) {
      return `💪 Muscle building:\n\n• Protein: 1.2–1.6g/kg\n• Carbs: rice, oats\n• Fats: nuts, olive oil`;
    } else if (msg.includes('diabetes')) {
      return `🩺 For diabetes:\n\n• Avoid sugars and refined carbs\n• Eat whole grains and proteins`;
    } else if (msg.includes('calorie')) {
      return `🔢 Calorie formula:\n\nMifflin-St Jeor Equation\nSend your weight, height, and age!`;
    } else {
      return `🤖 Sorry, I didn't understand. Can you rephrase or ask something else about nutrition?`;
    }
  }

  ngOnInit(): void {
    document.body.classList.add('ai-assistant-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('ai-assistant-body');
  }
}
