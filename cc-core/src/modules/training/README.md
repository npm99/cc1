# How to install

- Create demo folder under src/modules
- Pull CC Demo Module under demo folder
- Add this code in src/modules/modules.ts file

```
import { DemoExampleService } from "./demo/example/example.service";
import { DemoSettingService } from "./demo/setting/setting.service";

const CUSTOM_MODULES = [
  {
    module: DemoModule,
    services: [
      DemoExampleService,
      DemoSettingService
    ]
  }
]
```
