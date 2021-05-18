/**
 * This script is responsible for watching for soltipbot mentions on twitter and
 * firing off the correct cloud functions based on the tweet info. It effectively
 * controls transfers (receive/send) functions between wallets and also makes sure
 * to tweet back replies when transfers either complete or fail.
 *
 * Author: Rohan Kapur
 */

const l: Array<number> = [32, 3, 3, 3];
