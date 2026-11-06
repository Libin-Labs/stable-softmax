import { softmax } from '@lp-labs/stable-softmax';
if (Math.abs((softmax([0, Math.log(3)])[1] ?? 0) - 0.75) > 1e-12) throw new Error('Probability');
// @ts-expect-error invalid argument must be rejected by declarations
softmax(['1']);
