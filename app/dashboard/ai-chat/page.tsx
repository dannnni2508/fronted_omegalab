"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User, Loader2, BookOpen, Calculator, Code, Lightbulb } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '¡Hola! Soy tu asistente de estudios AI. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simular respuesta del AI (en una implementación real, esto sería una llamada a la API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Estoy procesando tu pregunta. En una implementación real, aquí recibirías una respuesta personalizada basada en tu consulta.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Panel principal del chat */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Bot className="h-6 w-6 text-green-600 mr-2" />
                Asistente de Estudios AI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' ? 'bg-green-100' : 'bg-blue-100'
                          }`}
                        >
                          {message.type === 'user' ? (
                            <User className="h-5 w-5 text-green-600" />
                          ) : (
                            <Bot className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {isClient && (
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Escribe tu pregunta aquí..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral con sugerencias */}
          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle className="text-sm">Sugerencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                onClick={() => setInputMessage("¿Puedes ayudarme a resolver este problema de matemáticas?")}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Ayuda matemática
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                onClick={() => setInputMessage("¿Puedes explicarme este concepto?")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Explicar concepto
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                onClick={() => setInputMessage("¿Cómo puedo mejorar mi código?")}
              >
                <Code className="h-4 w-4 mr-2" />
                Revisión de código
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                onClick={() => setInputMessage("¿Tienes consejos de estudio para este tema?")}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Consejos de estudio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 