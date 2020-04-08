import { Manager, Worker, Inject_js_handler } from "electron-page-tentacle";
import sleep from "sleep-promise";

export class Big_boss extends Manager
{

    worker_setting = {
        width: 900,
        height: 700,
    }
    
    inject_js: Inject_js_handler

    constructor()
    {
        super()
        this.inject_js = new Inject_js_handler([
            `${__dirname}/inject_js_lib/main_page_do`,
            `${__dirname}/inject_js_lib/search_result_do`,
        ])
    }

    async start()
    {
        this.init_worker()
        await this.goto_main_page()
        let result_links = await this.search_something(`雨伞`)
        console.log(`current page result count: ${result_links.length}`)
        await this.print_all_item_info(result_links)
        await this.close_workers()
    }

    init_worker()
    {
        this.set_workers([
            new Worker(this.worker_setting)
        ])

        this.get_main_worker().set_inject_js(this.inject_js)

        this.get_main_worker().page_init()
    }

    /**
     * 打开首页
     *
     * @memberof Big_boss
     */
    async goto_main_page()
    {
        await this.workers_do(async (_worker) => {
            _worker.open_url("https://www.amazon.cn/")
            await _worker.wait_page_load()
        })
    }

    /**
     * 搜索内容
     *
     * @param {string} _search_key 关键词
     * @returns {Promise<Array<string>>} 返回当前搜索结果商品链接
     * @memberof Big_boss
     */
    async search_something(_search_key: string): Promise<Array<string>>
    {
        let re_array: Array<string> = [];
        await this.workers_do(async (_worker) => {
            await _worker.exec_js(`input_search_bar("${_search_key}")`)
            await _worker.click(585, 69)
            await _worker.wait_page_load()
            re_array = await _worker.exec_js(`get_item_links()`)
            
        })
        return re_array;
    }

    /**
     * 输出商品信息, 默认搞前5个
     *
     * @param {Array<string>} _item_links 商品链接数组
     * @memberof Big_boss
     */
    async print_all_item_info(_item_links: Array<string>)
    {
        let _item_links_clone = _item_links.concat([]);
        // this.proliferate_worker_until(_item_links_clone.length)
        this.proliferate_worker_until(5)
        await this.workers_do(async (_worker, _worker_index) =>
        {
            let price_string = "no price";
            _worker.open_url(_item_links[<number>_worker_index])
            await _worker.wait_page_load()
            price_string = await _worker.exec_js(`get_item_price_string()`)
            console.log(`item ${_worker_index} : ${price_string}`);
        })
        
    }
}