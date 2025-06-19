import json
import openai
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.conf import settings

from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, ContextTypes

# OpenAI API Key
openai.api_key = settings.OPENAI_API_KEY

# Telegram Bot Instance
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)

# --- Async Handlers ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("👋 Hello! Use /chat followed by your message to talk to OpenAI.")

async def chat(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_input = ' '.join(context.args)
    
    if not user_input:
        await update.message.reply_text("⚠️ Please provide a message, e.g. `/chat What is AI?`")
        return

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ]
        )
        reply = response.choices[0].message.content.strip()
        await update.message.reply_text(reply)
    except Exception as e:
        print("OpenAI Error:", e)
        await update.message.reply_text("❌ Failed to get a reply from OpenAI.")

# --- Webhook Endpoint ---
@csrf_exempt
def telegram_webhook(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            update = Update.de_json(data, bot)

            application = Application.builder().token(settings.TELEGRAM_BOT_TOKEN).build()
            application.add_handler(CommandHandler("start", start))
            application.add_handler(CommandHandler("chat", chat))

            application.process_update(update)

            return JsonResponse({"status": "ok"})
        except Exception as e:
            print("Webhook Error:", e)
            return JsonResponse({"error": str(e)}, status=500)

    return HttpResponse("Only POST method is allowed", status=405)
