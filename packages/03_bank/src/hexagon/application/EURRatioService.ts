export class EURRatioService {
  getEURRatioForCurrency(currency: string) {
    const ratios: { [currency: string]: number; } = {
      'EUR': 1,
      'USD': 1.1,
    };
    const ratioEurRequestedCurrency = ratios[currency];
    return ratioEurRequestedCurrency;
  }
}
