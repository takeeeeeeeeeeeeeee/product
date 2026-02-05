from flask import Flask, render_template, request, url_for
import boto3
import hashlib

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
app.static_folder = 'static'

@app.route('/', methods=['GET', 'POST'])
def trans_top():
    if request.method == 'POST':
        in_text = request.form['input_text']
        source_lang = request.form['source_language']
        target_lang = request.form['target_language']
        result = translate(in_text, source_lang, target_lang)
        audio_url = synthesize_speech(result['TranslatedText'], target_lang)
        return render_template('translate.html', input_text=in_text, output_text=result['TranslatedText'], audio_url=audio_url)
    else:
        return render_template('translate.html', input_text='', output_text='', audio_url='')

def translate(text, source_lang, target_lang):
    translate = boto3.client('translate')
    result = translate.translate_text(Text=text, SourceLanguageCode=source_lang, TargetLanguageCode=target_lang)
    return result

def synthesize_speech(text, target_lang):
    voice_dict = {'en': 'Joanna', 'ja': 'Mizuki', 'fr': 'Celine', 'de': 'Vicki', 'es': 'Penelope'}
    voice_id = voice_dict.get(target_lang, 'Joanna')
    polly = boto3.client('polly')
    text_hash = hashlib.md5(text.encode()).hexdigest()
    filename = f"{text_hash}.mp3"
    file_path = f"static/{filename}"
    try:
        with open(file_path, "rb") as f:
            audio_stream = f.read()
    except FileNotFoundError:
        response = polly.synthesize_speech(Text=text, OutputFormat='mp3', VoiceId=voice_id)
        audio_stream = response['AudioStream'].read()
        with open(file_path, "wb") as f:
            f.write(audio_stream)
    audio_url = url_for('static', filename=filename)
    return audio_url

if __name__ == '__main__':
    app.run(host='localhost', port=8888, debug=True)
