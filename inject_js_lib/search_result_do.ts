let get_page_items: Function

export = {
    get_page_items: () =>
    {
        return document.querySelectorAll('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div:nth-child(1) > div > div > span > div > div > div:nth-child(3) > h2 > a')
    },

    get_item_links: () =>
    {
        let return_array:Array<string> = [];
        let item_doms = get_page_items();
        item_doms.forEach((item: HTMLLinkElement) =>
        {
            try {
                let temp_href = item.href;
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
            return (<string>document.querySelectorAll("#priceblock_ourprice")[0].textContent).substring(1)
        }catch(e){
            return "get fail"
        }
    }
}