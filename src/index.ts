function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function sample(values: readonly number[]): void {
  if (!Array.isArray(values) || !values.length || values.length > 100000)
    throw new RangeError('Sample size1..100000');
  for (const v of values) finite(v);
}
export function softmax(values: readonly number[], temperature = 1): number[] {
  sample(values);
  finite(temperature, Number.MIN_VALUE);
  let max = -Infinity;
  for (const v of values) if (v > max) max = v;
  const weights = values.map((v) => {
    const difference = v - max;
    return Math.exp(
      Number.isFinite(difference) ? difference / temperature : v / temperature - max / temperature,
    );
  });
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((v) => v / sum);
}
