---
title: "React plugin for progress-up"
date: 2018-11-28T15:15:26+10:00
feature_image: react.webp
draft: false
weight: 3
---

# React plugin development

React is a very popular web development framework from Facebook.

It is used for highly responsive web applications that use JSX code for
efficiency and fewer DOM updates.

In developing a plugin or REACT I faced some challenges in the beginning
when my learning was not adequate.

But over time I could fall in love and finish this work.

## Plugin architecture

In react the file `ProgressUp.tsx` is the source for all the template
and the typescript code that does the file upload.

Each image is included as part of assets packaging.

## How it works?

The plugin works in the standard react methodology of combining JSX
syntax with typescript to get things done.

I used the `function component` approach for this plugin.


## Code sample

Here is some code sample of JSX.

```ts
import React, {
    Fragment,
    useState,
    useRef,
    useEffect,
    Component
} from "react";
import {
    useDropzone
} from 'react-dropzone';
import './assets/style.css';
import axios from "axios";

import ldBar from './assets/progressBar/loading-bar.js';
import uploadIcon from './assets/icons/upload/file-submit.svg';
import progressTypes from './assets/progress-types.png';
import successIcon from './assets/icons/misc/success-icon.svg';
import trashIcon from './assets/icons/misc/trash-icon.svg';
import failureIcon from './assets/icons/misc/failure-icon.svg';

import avi from './assets/icons/filetypes/avi.svg';
import css from './assets/icons/filetypes/css.svg';
import csv from './assets/icons/filetypes/csv.svg';
import eps from './assets/icons/filetypes/eps.svg';
import excel from './assets/icons/filetypes/excel.svg';
import file from './assets/icons/filetypes/file.svg';
import html from './assets/icons/filetypes/html.svg';
import jpg from './assets/icons/filetypes/jpg.svg';
import mov from './assets/icons/filetypes/mov.svg';
import mp3 from './assets/icons/filetypes/mp3.svg';
import other from './assets/icons/filetypes/other.svg';
import pdf from './assets/icons/filetypes/pdf.svg';
import png from './assets/icons/filetypes/png.svg';
import ppt from './assets/icons/filetypes/ppt.svg';
import rar from './assets/icons/filetypes/rar.svg';
import txt from './assets/icons/filetypes/txt.svg';
import wav from './assets/icons/filetypes/wav.svg';
import word from './assets/icons/filetypes/word.svg';
import zip from './assets/icons/filetypes/zip.svg';

interface fileInfo {
    file: File;
    id: string;
    ts: string;
    size: string;
    thumb: string;
    meta: string;
    bytesSent: string;
    rate: string;
    eta: string;
};


```

And some JSX template.

```jsx

<div id="progress-up-progressArea"> 
  {uploadFileInfos.length > 0
  ? (
  uploadFileInfos.map(({file, id, size, thumb, meta, ts, bytesSent, rate, eta}, index) => (

  <section key={file.name} className="m-4 p-4 mt-4 mb-4 transition-colors
text-light-100 dark:text-white mx-auto">
    <div className="bg-dark dark:bg-gray dark:text-white rounded-md border border-red-800 rounded py-3 px-6
border-gray-300 text-gray-600 dark:text-white relative">

  <div  onClick={() => delItem(index)} title="Delete" className="absolute
cursor-pointer top-0 right-0 mr-2 dark:bg-white" >
	<img width="25" height="25" src={trashIcon} />
  </div>

  <div className="flex flex-wrap -mx-2 mb-8">
      <div className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
         <div className="h-12 text-sm text-grey-dark flex items-left
justify-left">
      		<div
      dangerouslySetInnerHTML={{__html: thumb}}></div>
        </div>
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
        <div className="h-12 text-sm text-grey-dark flex items-left justify-left">
          <ul>
      	    <li  className="text-xl font-light leading-relaxed text-gray-800
dark:text-white">
      	    Name: {file.name}
      	    </li>
      	    <li className="text-xl font-light leading-relaxed text-gray-800
dark:text-white">
      	    Date: {ts}
      	    </li>
      	    <li className="text-xl font-light leading-relaxed text-gray-800
dark:text-white">
      	    Type: {file.type}
      	    </li>
      	    <li className="text-xl font-light leading-relaxed text-gray-800
dark:text-white">
      	    Size: {size} 
      	    </li>
       	    <li className="font-light leading-relaxed text-gray-800
dark:text-white">
	    Metadata: {meta}
      	    </li>
      	    <li className="text-xl font-light leading-relaxed text-gray-800
dark:text-white">
		<span>{bytesSent} of {size} uploaded  {rate} MB/s ETA {eta} s</span>
      	    </li>
          </ul>
        </div>
       </div>
  </div>
      <div className='ldBar bottom-0 right-0 pb-8' id={id} ></div>
    </div>
  </section>
 ))
): <br/> }
</div>


```	
## How you can use it

{{<rawhtml>}}
<div class="flex justify-center">
<a href="https://react-ts-iscadj.stackblitz.io" class="bg-blue-200 rounded shadow-md text-black px-4 py-3 no-underline">Stackblitz </a>
</div>
{{</rawhtml>}}


This is how you install and use.
The stackblitz link has the instructions and help needed.

In short, just installing using npm or yarn like this will get you
started.

```shell
	$ yarn install progress-up-react
```

or

```shell
	$ npm install progress-up-react
```

Then just put this inside the HTML source the tags needed and you are
done.

```html
	<progress-up></progress-up>
```


## Challenges

The rendering issues I had with the file preview was pretty challenging
which was finally solved by changing the algorithm.
