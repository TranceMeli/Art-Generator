console.log("app js is loaded")

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inputForm")
    const userInput = document.getElementById("userInput");
    const output = document.getElementById("output");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Form submitted")
        
        // const text = userInput.value;
        const chars = document.getElementById("chars").value;
        const charCount = document.getElementById("charCount").value;
        const lineCount = document.getElementById("lineCount").value;
        const spaceCount = document.getElementById("spaceCount").value;
        const characters = document.getElementById("characters").value;

        const response = await fetch("/submit", {
            method: "POST",
            headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chars,
            charCount,
            lineCount,
            spaceCount,
            characters
        })
    });
    
        const result = await response.json();
        output.innerHTML = colorizeText(result.response);

        form.reset();
    });

    function colorizeText(text){
        const colors = ['#FF5733', '#2fff55ff', '#2e55ffff', '#f9ae35ff', '#c532ffff', '#faf033ff']
        let html = '';

        for (let line of text.split('\n')){
            for (let char of line) {

                if (char == '[' || char === ']' || char === '-' || char === '|'){
                    html += char;
                }
                else{
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    html += `<span style="color:${color}">${char}</span>`;
                }
            }
            html += '<br>';
        }
        return html;
    }

});
