axios
  .get("https://api.quotable.io/random")
  .then((respons) => {
    let para = document.querySelector("p");
    let content = respons.data.content;
    para.innerHTML = content;

    let stopTime = parseInt(content.length / 3);
    const myInterval = setInterval(() => {
      let paraTime = document.querySelector("#time");
      paraTime.innerHTML = --stopTime;
      if (stopTime === 0) {
        clearInterval(myInterval);
        document.querySelector("textarea").disabled = true;
        document.querySelector("textarea").style.backgroundColor = "white";
      } else if (stopTime < 11) {
        document.querySelector("#sec").classList.add("color-red");
        paraTime.style.color = "red";
      }
    }, 1000);

    let counterMistakes = 1;
    let percent = document.querySelector("#percent");

    document.querySelector("textarea").addEventListener("input", () => {
      const resultBall = document.querySelector("textarea").value.split("");
      resultBall.forEach((v, i, a) => {
        if (i + 1 === content.length) {
          percent.innerHTML = ` <span class="link-primary">||</span>Done for ${parseInt(
            ((i + 1) / content.length) * 100
          )}%`;
        } else if (i + 1 != content.length) {
          percent.innerHTML = ` <span class="link-primary">||</span>Done for ${parseInt(
            ((i + 1) / content.length) * 100
          )}%`;
        }
      });

      let textarea = document.querySelector("textarea").value;
      let myRegEx = new RegExp(textarea);
      let toUpper = textarea.charAt(0) + textarea.slice(1);
      let mistakesPara = document.querySelector("#mistakes");

      if (textarea === content) {
        clearInterval(myInterval);
      }
      if (!/[A-Z]/.test(toUpper)) {
        document.querySelector("textarea").maxLength = 1;
        document.querySelector("textarea").style =
          "color:red; border:1px solid red";
        mistakesPara.innerHTML = `Mistakes: ${counterMistakes++}`;
      } else if (!myRegEx.test(content)) {
        document.querySelector("textarea").maxLength = 1;
        document.querySelector("textarea").style =
          "color:red; border:1px solid red";
        mistakesPara.innerHTML = `Mistakes: ${counterMistakes++}`;
      } else {
        document.querySelector("textarea").maxLength = content.length;
        document.querySelector("textarea").style = "color:black";
      }
    });
  })
  .catch((err) => {
    document.querySelector(".display-none").style.display = "none";
    document.querySelector("#err").innerHTML = "404";
  });

document.querySelector("button").addEventListener("click", () => {
  window.location.href = "index.html";
});
