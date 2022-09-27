// 705.484.450-52
// 070.987.720-03

function ValidationCPF(cpf) {
    Object.defineProperty(this, 'cleanCPF', {
        enumerable: true,

        get: function() {
            return cpf.replace(/\D+/g, '');
        }
    });
}


ValidationCPF.prototype.validate = function() {

    if (typeof this.cleanCPF === 'undefined') return false;
    if (this.cleanCPF.length !== 11) return false;
    if (this.isSequential()) return false;

    const baseCPF = this.cleanCPF.slice(0, -2); // first nine numbers
    const firstDigit = this.generateDigit(baseCPF);
    const secondDigit = this.generateDigit(baseCPF + firstDigit);

    const newCPF = baseCPF + firstDigit + secondDigit;

    return newCPF === this.cleanCPF;
}


ValidationCPF.prototype.isSequential = function() {
    return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF;
}


ValidationCPF.prototype.generateDigit = function(baseCPF) {

    const array = Array.from(baseCPF);
    let regressive = array.length + 1;

    const total = array.reduce((acumulator, value) => {

        acumulator += (regressive * Number(value));
        regressive--;

        return acumulator;
    }, 0)

    let digit = 11 - (total % 11);

    return digit > 9 ? '0' : String(digit);
}

const cpf = new ValidationCPF('042.736.150-88');
console.log(cpf.cleanCPF, cpf.validate());