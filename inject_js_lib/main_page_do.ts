export = {
    input_search_bar: (_w: string) =>
    {
        (<HTMLInputElement>document.querySelectorAll("#twotabsearchtextbox")[0]).value = _w
    }
}