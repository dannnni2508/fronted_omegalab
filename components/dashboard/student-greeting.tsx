"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function StudentGreeting({ name = "Carlos" }) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    let greetingText = ""

    if (hour >= 5 && hour < 12) {
      greetingText = "¡Buenos días"
    } else if (hour >= 12 && hour < 18) {
      greetingText = "¡Buenas tardes"
    } else {
      greetingText = "¡Buenas noches"
    }

    setGreeting(`${greetingText}, ${name}!`)
  }, [name])

  return (
    <Card className="bg-gradient-to-r from-green-500 to-green-700 text-white border-none mb-6">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold">{greeting}</h2>
        <p className="mt-2 opacity-90">Bienvenido de nuevo a tu portal académico.</p>
      </CardContent>
    </Card>
  )
}
