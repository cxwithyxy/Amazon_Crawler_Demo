let get_page_items: Function

export = {
    get_page_items: () =>
    {
        return document.querySelectorAll("#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div")
    },

    get_item_links: () =>
    {
        let return_array:Array<string> = [];
        let item_doms = get_page_items();
        item_doms.forEach((item: HTMLDivElement) =>
        {
            try {
                let temp_href = item.querySelectorAll("a")[0].href;
                return_array.push(temp_href)
            } catch (error) {
                console.log(error);
            }
        });
        return return_array
    },

    get_item_price_string: () =>
    {
        try{
            return (<string>document.querySelectorAll("#priceblock_saleprice")[0].textContent).substring(1)
        }catch(e){
            return "get fail"
        }
    }
}