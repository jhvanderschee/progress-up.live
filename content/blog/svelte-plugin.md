---
title: "Svelte plugin for progress-up"
date: 2018-11-28T15:15:26+10:00
featureImage: svelte.webp
draft: false
weight: 3
---

# Svelte plugin ready

Svelte as a web development framework was quite unknown to me.

And I found it very pleasant to work with.

Also their packaging takes the cake. It is really easy to package a
svelte plugin and the development is also quite pleasant.

In this article we shall see how the plugin was implemented for HTML5
upload functionality.

## Plugin architecture

Svelte uses several files.

- ProgressUp.svelte
- tab1.svelte
- tab2.svelte
- tab3.svelte
- tab4.svelte
- store.ts

This is a really nice way of dividing up each tab's code.

I also use store.ts which significantly reduces code reuse.


## How it works?

Svelte has reactivity built into its coding and you only have to use
the storable properly and you will get it going.

## Code sample

Here are some code samples.

This is `ProgressUp.svelte`.


```ts
<script lang='ts'>
   import {openTab, totalsize, totalfiles, inputs, uploadFileList, uploadFileInfos, errInfos, progressBars, } from './store.js';



let darkMode = false;

    let disableUpload = true;
    let thumbNailsDone = false;
    let isDragged = false;
    let details = '';

   function toggle() {
        darkMode = !darkMode;
        window.document.body.classList.toggle('dark');
    }

 
 const checkTotalSize =() => {
        if ($inputs.sizeLimitType == "Total limit") {
            if ($totalsize <= ($inputs.fileSizeLimit * 1024 * 1024)) {
                return true;
            }
            return false;
        }
        return false;
    };

       const delItem = (index:number) => {
	let s:number;
	s = $uploadFileList[index].size;
        $totalsize -= s;
        $uploadFileList.splice(index, 1);
	let list = $uploadFileList as File[];
        $uploadFileList = list;

        $uploadFileInfos && $uploadFileInfos.splice(index, 1);
        checkTotalSize();
    };


import Tab1 from './tab1.svelte';
import Tab2 from './tab2.svelte';
import Tab3 from './tab3.svelte';
import Tab4 from './tab4.svelte';
</script>


```

And from store.ts.

```ts
import { writable } from 'svelte/store';

export const inputs = writable({
        uploadURL: "",
        filesName: "",
        progType: "Line",
        authEnabled: false,
        authType: "",
        user: "",
        pass: "",
        fileSizeLimit: 10,
        sizeLimitType: "Single file limit",
        fileTypeFilter: "All",
        fileTypeAction: "Allow file type"
});

type statsTableType = {
    id: number;
    ts: string;
    status: string;
    details: string;
};

type fileInfo = {
    file: File;
    id: string;
    ts: string;
    thumb: string;
    meta: string;
    bytesSent: string;
    rate: string;
    eta: string;
};
```



## How you can use it

{{<rawhtml>}}
<div class="flex justify-center">
<a href="https://stackblitz.com/edit/vitejs-vite-vu9dag" class="bg-blue-600 rounded shadow-md text-black px-4 py-3 no-underline">Stackblitz </a>
</div>
{{</rawhtml>}}


The stackblitz link has the instructions and help needed.

In short, just installing using npm or yarn like this will get you
started.

```shell
	$ yarn install progress-up-svelte
```

or

```shell
	$ npm install progress-up-svelte
```

Then just put this inside the HTML source the tags needed and you are
done.

```html
	<progress-up></progress-up>
```


## Challenges

For svelte the rendering issues were minor.

And the documentation pretty good.

Still it had to be learnt as I was quite new to svelte syntax.

