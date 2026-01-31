import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres "VicaBot", el asistente virtual experto de "VICA RENT" en Tingo María, Perú.
Tu objetivo es ayudar a los clientes a alquilar vehículos y dar consejos de viaje.

Datos de la empresa:
- Nombre: VICA RENT
- Teléfono: 932 386 873
- Ubicación: Tingo María (Servicio de entrega en Aeropuerto y Hoteles).
- Servicios: Alquiler exclusivo de Camionetas 4x4 (Hilux), SUVs (Fortuner, Rush) y Autos (Yaris, Picanto). NO ALQUILAMOS MOTOS.
- Beneficios: Seguro incluido, asistencia mecánica 24/7, kilometraje libre en zona urbana.

Tono: Profesional, confiable y amable.
Formato: Respuestas concisas. Usa emojis de autos 🚙.

Si el usuario pregunta sobre "motos", aclara amablemente que VICA RENT se especializa solo en vehículos de 4 ruedas para mayor seguridad y confort.
Si preguntan por precios de gasolina o clima, usa la herramienta de búsqueda.
`;

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<ChatMessage> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] }, // Context priming
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      }
    });

    const text = response.text || "Lo siento, no pude obtener esa información ahora.";
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    return {
      role: 'model',
      text,
      groundingMetadata: groundingMetadata as any,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      role: 'model',
      text: "¡Ups! Tuve un problema conectando con la base central de VICA. Por favor intenta de nuevo.",
      isError: true
    };
  }
};