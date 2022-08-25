export interface StockCandles {
    /**
     * List of close prices for returned candles.
     */
    c: string[];

    /**
     * List of high prices for returned candles.
     */
    h: string[];

    /**
     * List of low prices for returned candles.
     */
    l: string[];

    /**
     * List of open prices for returned candles.
     */
    o: string[];

    /**
     * Status of the response. This field can either be ok or no_data.
     */
    s: string;

    /**
     * List of timestamp for returned candles.
     */
    t: string[];

    /**
     * List of volume data for returned candles.
     */
    v: string[];
}