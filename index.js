'use strict';

// Official list of TLDs should be fetched from:
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt

function createDomainChecker(tlds) {
	return function isFQDN(domain) {

		if (domain.length > 253) {
			return false;
		}

		const labels = domain.split('.').reverse();

		if (labels.length < 2) {
			return false;
		}

		const tld = labels[0];

		if (!tlds.includes(tld)) {
			return false;
		}

		for (const label of labels) {

			const len = label.length;

			if (len > 63 || len === 0) {
				return false;
			}

			for (let i = 0; i < len; i++) {

				const char = label[i];

				if ((i === 0 || i === len - 1) && char === '-') {
					return false;
				}

				if (!char.match(/^[a-zA-Z0-9-]$/)) {
					return false;
				}
			}
		}
		return true;
	};
}

module.exports = createDomainChecker;
