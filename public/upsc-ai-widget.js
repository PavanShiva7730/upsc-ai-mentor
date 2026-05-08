(function () {
  if (document.getElementById("upsc-ai-btn")) return;

  var style = document.createElement("style");

  style.innerHTML = `
    #upsc-ai-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: #0f766e;
      color: #fff;
      border: none;
      font-size: 30px;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    }

    #upsc-ai-frame {
      position: fixed;
      bottom: 95px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 20px;
      display: none;
      z-index: 999999;
      box-shadow: 0 10px 35px rgba(0,0,0,0.3);
      background: #fff;
    }

    @media(max-width:768px){
      #upsc-ai-frame {
        width: 95%;
        height: 85vh;
        right: 2.5%;
        bottom: 90px;
      }
    }
  `;

  var btn = document.createElement("button");
  btn.id = "upsc-ai-btn";
  btn.innerHTML = "🎓";

  var frame = document.createElement("iframe");
  frame.id = "upsc-ai-frame";
  frame.src = "https://upsc-ai-mentor.vercel.app/";

  btn.onclick = function () {
    frame.style.display =
      frame.style.display === "block"
        ? "none"
        : "block";
  };

  document.head.appendChild(style);
  document.body.appendChild(btn);
  document.body.appendChild(frame);
})();
