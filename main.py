from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

PADDING = 4

def generate_ascii_art(char_count, line_count, base, space_count):
    base += " " * space_count

    def lines_line():
        return "[" + "-" * (char_count + 2 * PADDING) + "]"

    def character_picture():
        character_rnd = "".join(random.choices(base, k=char_count))
        return "|" + " " * PADDING + character_rnd + " " * PADDING + "|"

    output_lines = [lines_line()]
    for _ in range(line_count):
        output_lines.append(character_picture())
    output_lines.append(lines_line())
    
    return "\n".join(output_lines)

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    char_count = int(data.get("charCount", 20))
    line_count = int(data.get("lineCount", 6))
    chars = data.get("chars", "01")
    characters = data.get("characters", "01")
    space_count = int(data.get("spaceCount", 10))

    base = chars if chars else characters

    ascii_art = generate_ascii_art(char_count, line_count, base, space_count)

    return jsonify({"response":ascii_art})
    # user_input = data.get("user_input", "")
    # return jsonify({"response": f"You typed: {user_input}"})

if __name__ == "__main__":
    app.run(debug=True)