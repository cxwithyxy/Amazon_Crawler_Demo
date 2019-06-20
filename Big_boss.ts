import { Manager, Worker, Inject_js_handler } from "ElectronPageTentacle";

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
            `${__dirname}/inject_js_lib/main_page_do`
        ])
    }

    async start()
    {
        this.init_worker()
        await this.goto_main_page()
        await this.search_something(`雨伞`)
    }

    init_worker()
    {
        this.set_workers([
            new Worker(this.worker_setting)
        ])

        this.get_main_worker().set_inject_js(this.inject_js)

        this.get_main_worker().page_init()
    }

    async goto_main_page()
    {
        await this.workers_do(async (_worker) => {
            _worker.open_url("https://www.amazon.cn/")
            await _worker.wait_page_load()
        })
    }

    async search_something(_search_key: string)
    {
        await this.workers_do(async (_worker) => {
            await _worker.exec_js(`input_search_bar("${_search_key}")`)
            await _worker.click(585, 69)
            await _worker.wait_page_load()
        })
    }
}