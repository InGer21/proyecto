import re
import random
import mysql.connector

mydb = mysql.connector.connect(
    host="sql10.freemysqlhosting.net",
    user="sql10612082",
    password="9ZSNvDquHI",
    database="sql10612082",
    port=3306
)

def get_response(user_input):
    split_message = re.split(r'\s|[,:;.?!-_]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response

def message_probability(user_message, recognized_words, single_response=False, required_words=[]):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognized_words:
            message_certainty += 1

    percentage = float(message_certainty) / float(len(recognized_words))

    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break

    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0

def check_all_messages(message):
    responses = []
    mycursor = mydb.cursor()
    guayaba = 1
    mycursor.execute('SELECT * FROM respuestas WHERE id = %s', (guayaba,))
    resultado = mycursor.fetchone()
    mycursor.execute('SELECT * FROM respuestas')
    resultados = mycursor.fetchall()

    for resultado in resultados:
        response_text = resultado[1]
        recognized_words = [resultado[2], resultado[3], resultado[4], resultado[5], resultado[6], resultado[7], resultado[8], resultado[9], resultado[10], resultado[11]]
        single_response = resultado[12]
        required_words = [resultado[13]]

        prob = message_probability(message, recognized_words, single_response, required_words)
        if prob > 0:
            responses.append((response_text, prob, single_response, required_words))

    responses.sort(key=lambda x: (x[1], x[2], len(x[3])), reverse=True)


    if len(responses) > 0:
        response_text = responses[0][0]
        return response_text
    else:
        return unknown()

def unknown():
    response = ['puedes decirlo de nuevo?', 'No estoy seguro de lo que quieres', 'búscalo en google a ver qué tal'][random.randrange(3)]
    return response