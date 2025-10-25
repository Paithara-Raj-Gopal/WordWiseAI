from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
import os

class MeaningView(APIView):
    def get(self, request, word):
        if cache.get(word):
            return Response(cache.get(word))

        try:
            genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-2.5-flash')
            prompt = f"Generate a meaning, 3 synonyms, and 3 example sentences for the word '{word}' as a JSON object with keys 'meaning', 'synonyms', and 'example_sentences'."
            response = model.generate_content(prompt)

            meaning_data = response.text

            cache.set(word, meaning_data, timeout=3600)  # Cache for 1 hour
            return Response(meaning_data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)