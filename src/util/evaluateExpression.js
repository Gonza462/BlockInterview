//safe eval() method alternative
export function evalExpression(expr) {
  let parens = /\(([0-9+\-*/ .]+)\)/; // Regex for identifying parenthetical expressions
  let exp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying exponentials (x ^ y)
  let mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
  let div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
  let add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
  let sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      let newExpr = expr.replace(parens, function (match, subExpr) {
        return evalExpression(subExpr);
      });
      return evalExpression(newExpr);
    } else if (exp.test(expr)) {
      let newExpr = expr.replace(exp, function (match, base, pow) {
        return Math.pow(Number(base), Number(pow));
      });
      return evalExpression(newExpr);
    } else if (mul.test(expr)) {
      let newExpr = expr.replace(mul, function (match, a, b) {
        return Number(a) * Number(b);
      });
      return evalExpression(newExpr);
    } else if (div.test(expr)) {
      let newExpr = expr.replace(div, function (match, a, b) {
        if (b !== 0) return Number(a) / Number(b);
        else throw new Error('Division by zero');
      });
      return evalExpression(newExpr);
    } else if (add.test(expr)) {
      let newExpr = expr.replace(add, function (match, a, b) {
        return Number(a) + Number(b);
      });
      return evalExpression(newExpr);
    } else if (sub.test(expr)) {
      let newExpr = expr.replace(sub, function (match, a, b) {
        return Number(a) - Number(b);
      });
      return evalExpression(newExpr);
    } else {
      return expr;
    }
  }
  return Number(expr);
}
