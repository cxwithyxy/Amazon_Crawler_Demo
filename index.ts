import { Big_boss } from "./Big_boss";
import { app } from "electron";

app.on("ready", async () => {

    let big_boss = new Big_boss()
     
    console.log("we are going to work");
     
    await big_boss.start()
    
    console.log("job done");

})