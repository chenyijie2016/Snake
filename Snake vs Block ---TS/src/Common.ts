class common {
    public static GetRandomNum(Min: number, Max: number): number {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    // public static async sleep(ms) {
    //     return new Promise(async (resolve) => {
    //         await setTimeout(resolve, ms);
    //     })
    // }
}