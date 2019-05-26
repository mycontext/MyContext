/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeHealthRecord(recordTrade) {
    recordTrade.record.recordBuyer = recordTrade.recordBuyer;
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.HealthRecord');
    await assetRegistry.update(recordTrade.record);
}