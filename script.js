const buttons = document.querySelectorAll("button");
const display = document.getElementById("selected-formula");
const inputArea = document.getElementById("input-area");

const formulas = {
  "v = u + at": {
    inputs: ["u", "a", "t"],
    units: ["m/s", "m/s²", "s"],
    calculate: (u, a, t) => u + a * t,
    output: "v",
    outputUnit: "m/s"
  },

  "s = ut + ½at²": {
    inputs: ["u", "t", "a"],
    units: ["m/s", "s", "m/s²"],
    calculate: (u, t, a) => u * t + 0.5 * a * t * t,
    output: "s",
    outputUnit: "m"

  },
    "v² = u² + 2as": {
    inputs: ["u", "a", "s"],
    units: ["m/s", "m/s²", "m"],
    calculate: (u, a, s) => (u * u + 2 * a * s)**0.5,
    output: "v",
    outputUnit: "m/s"
  },

  "a = (v - u) / t":{
    inputs: ["v", "u", "t"],
    units: ["m/s", "m/s","s"],
    calculate: (v, u, t) => (v-u)/t,
    output: "a",
    outputUnit: "m/s²"
  },

  "F = ma" : {
    inputs: ["m", "a"],
    units: ["kg", "m/s²"],
    calculate: (m, a) => m*a,
    output: "F",
    outputUnit: "N"
  },

  "p (momentum) = mv": {
    inputs: ["m", "v"],
    units: ["kg", "m/s"],
    calculate:(m, v) => m*v,
    output: "P",
    outputUnit: "kg∙m/s",
  },

  "P (pressure) = F/A": {
    inputs: ["F", "A"],
    units: ["N", "m²"],
    calculate:(F, A) => F/A,
    output: "P",
    outputUnit: "Pa",
  },

  "W = Fs": {
    inputs: ["F", "s"],
    units: ["N", "m"],
    calculate: (F, s) => F*s,
    output: "W",
    outputUnit: "J"
  },

  "P = W/t": {
    inputs: ["W", "t"],
    units: ["J", "s"],
    calculate: (W, t) => W/t,
    output: "P",
    outputUnit: "Watt",
  },

  "KE = ½mv²": {
    inputs: ["m", "v"],
    units: ["kg", "m/s"],
    calculate: (m, v) => 0.5*m*v*v,
    output: "KE",
    outputUnit: "J",
  },

  "PE = mgh": {
    inputs: ["m", "g", "h"],
    units: ["kg", "m/s²", "m"],
    calculate: (m, g, h) => m*g*h,
    output: "PE",
    outputUnit: "J",
  },

  "E = mc²": {
    inputs: ["m", "c"],
    units: ["kg", "m/s"],
    calculate: (m,c) => m*c*c,
    output: "E",
    outputUnit: "J"
  },

  "V = IR": {
    inputs: ["I", "R"],
    units: ["A", "Ω"],
    calculate:(I,R) => I*R,
    output: "V",
    outputUnit: "Volt"
  },

  "I = Q/t": {
    inputs: ["Q", "t"],
    units: ["C", "s"],
    calculate: (Q,t) => Q/t,
    output: "I",
    outputUnit: "A",
  },

  "F = KQq/r²": {
    inputs: ["Q", "q", "r"],
    units: ["C", "C", "m"],
    calculate: (Q, q, r) => (9*(10**9)*Q*q)/(r*r),
    output: "F",
    outputUnit: "N",
  },

  "v = fλ": {
    inputs: ["f", "λ"],
    units: ["Hz", "m"],
    calculate: (f,λ) => f*λ,
    output: "v",
    outputUnit: "m/s"
  },

  "T = 1/f": {
    inputs: ["f"],
    units: ["Hz"],
    calculate: (f) => 1/f,
    output: "T",
    outputUnit: "s"
  },

  "ω = 2πf": {
    inputs: ["f"],
    units: ["Hz"],
    calculate: (f) => 2*3.1415*f,
    output: "ω",
    outputUnit: "rad/s"
  },

  "ρ = m/V":{
    inputs: ["m", "V"],
    units: ["kg", "m³"],
    calculate:(m,V) => m/V,
    output: "ρ",
    outputUnit: "kg/m³"
  },

  "Q = mcΔT": {
    inputs: ["m", "c", "ΔT"],
    units: ["kg", "J/kg·K", "K"],
    calculate: (m, c, ΔT) => m*c*ΔT,
    output: "Q",
    outputUnit: "J"
  }

};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const formula = button.textContent;
    const data = formulas[formula];
    if (!data) return;

    display.textContent = formula;

    inputArea.innerHTML = `
      <h3>${formula}</h3>

      ${data.inputs.map((name, i) => `
        <input placeholder="${name} (${data.units[i]})">
      `).join("")}

      <button id="calc-btn">Calculate for (${data.output})</button>
      <p id="result" class="result-box">${formula[0]+" ="}</p>
    `;

    document.getElementById("calc-btn").addEventListener("click", () => {
      const values = inputArea.querySelectorAll("input");
      const nums = Array.from(values).map(v => Number(v.value));

      if (Array.from(values).some(v => v.value.trim() === "")) {
        document.getElementById("result").textContent = "⚠️ Please fill all fields";
        return;
      }

      if (nums.some(n => isNaN(n))) {
        document.getElementById("result").textContent = "⚠️ Only numbers allowed";
        return;
      }

      const result = data.calculate(...nums);

      document.getElementById("result").textContent =
        `${data.output} = ${result.toFixed(2)} ${data.outputUnit}`;
    });
  });
});