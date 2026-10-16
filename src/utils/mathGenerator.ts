export type OperationType = 'add' | 'sub' | 'mul' | 'div' | 'power' | 'root' | 'equation';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface MathProblem {
  id: string;
  operationType: OperationType;
  answer: number;
  expression: string; // The mathematical problem shown (e.g. "7 + 5", "4²", "√64", "2x + 3 = 11")
  promptLabel?: string; // Optional label for prompt, e.g. "x =" for equations, or "=" for normal
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(
  allowedOps: OperationType[],
  difficulty: DifficultyLevel
): MathProblem {
  if (!allowedOps || allowedOps.length === 0) {
    allowedOps = ['add'];
  }

  const opType = allowedOps[Math.floor(Math.random() * allowedOps.length)];
  let answer = 2;
  let expression = '1 + 1';
  let promptLabel = '=';

  if (opType === 'add') {
    let num1 = 1;
    let num2 = 1;
    if (difficulty === 'easy') {
      num1 = getRandomInt(1, 9);
      num2 = getRandomInt(1, 9);
    } else if (difficulty === 'medium') {
      num1 = getRandomInt(10, 49);
      num2 = getRandomInt(5, 35);
    } else {
      num1 = getRandomInt(25, 99);
      num2 = getRandomInt(20, 99);
    }
    answer = num1 + num2;
    expression = `${num1} + ${num2}`;
  } else if (opType === 'sub') {
    let num1 = 2;
    let num2 = 1;
    if (difficulty === 'easy') {
      num1 = getRandomInt(2, 12);
      num2 = getRandomInt(1, num1);
    } else if (difficulty === 'medium') {
      num1 = getRandomInt(15, 60);
      num2 = getRandomInt(5, num1);
    } else {
      num1 = getRandomInt(40, 150);
      num2 = getRandomInt(15, num1);
    }
    answer = num1 - num2;
    expression = `${num1} − ${num2}`;
  } else if (opType === 'mul') {
    let num1 = 2;
    let num2 = 2;
    if (difficulty === 'easy') {
      num1 = getRandomInt(1, 6);
      num2 = getRandomInt(1, 5);
    } else if (difficulty === 'medium') {
      num1 = getRandomInt(3, 10);
      num2 = getRandomInt(3, 9);
    } else {
      num1 = getRandomInt(6, 15);
      num2 = getRandomInt(4, 12);
    }
    answer = num1 * num2;
    expression = `${num1} × ${num2}`;
  } else if (opType === 'div') {
    let divisor = 2;
    let quotient = 2;
    if (difficulty === 'easy') {
      divisor = getRandomInt(1, 5);
      quotient = getRandomInt(1, 6);
    } else if (difficulty === 'medium') {
      divisor = getRandomInt(2, 9);
      quotient = getRandomInt(2, 10);
    } else {
      divisor = getRandomInt(3, 12);
      quotient = getRandomInt(4, 15);
    }
    const dividend = divisor * quotient;
    answer = quotient;
    expression = `${dividend} ÷ ${divisor}`;
  } else if (opType === 'power') {
    // Potencias (x² o x³)
    if (difficulty === 'easy') {
      // Potencias al cuadrado de 1 al 6 y 10
      const bases = [1, 2, 3, 4, 5, 6, 10];
      const base = bases[getRandomInt(0, bases.length - 1)];
      answer = base * base;
      expression = `${base}²`;
    } else if (difficulty === 'medium') {
      // Cuadrados del 6 al 12 o cubos pequeños (2³, 3³, 4³)
      const isCube = Math.random() < 0.35;
      if (isCube) {
        const base = getRandomInt(2, 4);
        answer = base * base * base;
        expression = `${base}³`;
      } else {
        const base = getRandomInt(6, 12);
        answer = base * base;
        expression = `${base}²`;
      }
    } else {
      // Avanzado: bases como 13², 14², 15², 20² o cubos 5³ o potencias 2⁴, 3⁴
      const pick = getRandomInt(1, 4);
      if (pick === 1) {
        const base = getRandomInt(13, 20);
        answer = base * base;
        expression = `${base}²`;
      } else if (pick === 2) {
        const base = getRandomInt(3, 6);
        answer = base * base * base;
        expression = `${base}³`;
      } else if (pick === 3) {
        // 2⁴ o 3⁴
        const base = getRandomInt(2, 3);
        answer = Math.pow(base, 4);
        expression = `${base}⁴`;
      } else {
        const base = 2;
        answer = 32;
        expression = `2⁵`;
      }
    }
  } else if (opType === 'root') {
    // Raíces cuadradas exactas
    if (difficulty === 'easy') {
      // Raíces de cuadrados del 2 al 10
      const rootVal = getRandomInt(2, 10);
      const radicand = rootVal * rootVal;
      answer = rootVal;
      expression = `√${radicand}`;
    } else if (difficulty === 'medium') {
      // Raíces de cuadrados del 11 al 15
      const rootVal = getRandomInt(11, 15);
      const radicand = rootVal * rootVal;
      answer = rootVal;
      expression = `√${radicand}`;
    } else {
      // Raíces de cuadrados del 16 al 25 y 30
      const roots = [16, 17, 18, 19, 20, 25, 30];
      const rootVal = roots[getRandomInt(0, roots.length - 1)];
      const radicand = rootVal * rootVal;
      answer = rootVal;
      expression = `√${radicand}`;
    }
  } else if (opType === 'equation') {
    // Ecuaciones de 1er grado
    promptLabel = 'x =';
    if (difficulty === 'easy') {
      // En nivel básico: ecuaciones de sumas y restas
      const type = getRandomInt(1, 3);
      if (type === 1) {
        // x + b = c
        const xVal = getRandomInt(2, 12);
        const b = getRandomInt(1, 9);
        const c = xVal + b;
        answer = xVal;
        expression = `x + ${b} = ${c}`;
      } else if (type === 2) {
        // x - b = c
        const b = getRandomInt(2, 8);
        const c = getRandomInt(1, 9);
        const xVal = c + b;
        answer = xVal;
        expression = `x − ${b} = ${c}`;
      } else {
        // a + x = c
        const a = getRandomInt(2, 9);
        const xVal = getRandomInt(2, 10);
        const c = a + xVal;
        answer = xVal;
        expression = `${a} + x = ${c}`;
      }
    } else if (difficulty === 'medium') {
      // Nivel medio: multiplicación y división en ecuaciones
      const type = getRandomInt(1, 3);
      if (type === 1) {
        // a * x = c
        const a = getRandomInt(2, 7);
        const xVal = getRandomInt(2, 9);
        const c = a * xVal;
        answer = xVal;
        expression = `${a}x = ${c}`;
      } else if (type === 2) {
        // x / b = c
        const b = getRandomInt(2, 6);
        const c = getRandomInt(2, 6);
        const xVal = b * c;
        answer = xVal;
        expression = `x ÷ ${b} = ${c}`;
      } else {
        // a*x + b = c
        const a = getRandomInt(2, 4);
        const xVal = getRandomInt(2, 8);
        const b = getRandomInt(1, 9);
        const c = a * xVal + b;
        answer = xVal;
        expression = `${a}x + ${b} = ${c}`;
      }
    } else {
      // Nivel difícil: ecuaciones combinadas, con potencias/raíces o coeficientes mayores
      const type = getRandomInt(1, 4);
      if (type === 1) {
        // a*x - b = c
        const a = getRandomInt(3, 7);
        const xVal = getRandomInt(3, 12);
        const b = getRandomInt(5, 20);
        const c = a * xVal - b;
        answer = xVal;
        expression = `${a}x − ${b} = ${c}`;
      } else if (type === 2) {
        // x² = c
        const xVal = getRandomInt(3, 10);
        const c = xVal * xVal;
        answer = xVal;
        expression = `x² = ${c}`;
      } else if (type === 3) {
        // √x = c
        const c = getRandomInt(3, 8);
        const xVal = c * c;
        answer = xVal;
        expression = `√x = ${c}`;
      } else {
        // a*x + b = c (coeficientes más altos)
        const a = getRandomInt(4, 9);
        const xVal = getRandomInt(4, 15);
        const b = getRandomInt(10, 30);
        const c = a * xVal + b;
        answer = xVal;
        expression = `${a}x + ${b} = ${c}`;
      }
    }
  }

  return {
    id: `${Date.now()}-${Math.random()}`,
    operationType: opType,
    answer,
    expression,
    promptLabel,
  };
}
