import { get } from './fetcher.js';
import { CETIP_API, CETIP_CDI_PATH, HEADERS } from './constants.js';
/**
 * Fetch cdi value from CETIP
 * @returns {Promise<number | never>} current cdi value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentCdi() {
    try {
        const url = `${CETIP_API}${CETIP_CDI_PATH}`;
        const options = { headers: HEADERS };
        const data = await get(url, options);
        const cdiString = data.taxa.replace(/[.]/g, '').replace(',', '.');
        const cdi = Number(Number(cdiString).toFixed(2));
        return cdi;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=cetip.js.map