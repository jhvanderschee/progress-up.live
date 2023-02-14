---
title: "Angular plugin for progress-up"
date: 2018-11-28T15:15:26+10:00
feature_image: angular.webp
draft: false
---

# Angular plugin development

Angular is one of the most popular web development frameworks for single
page applications and with Angular material this is widely used.

Angular has evolved over time with a focus on pure typescript code, CSS
for each template and a rich plugin ecosystem.

The build tools have also changed over time with a rather intensive
development process.

In this article we shall see how the Angular plugin was built for
progress-up.

## Plugin architecture

The plugin has only 3 files.

- progress-up.component.css
- progress-up.component.html
- progress-up.component.ts

And a progress-up.module.ts

The plugin has most of the functionality in the typescript file and the
HTML template.

## How it works?

Angular has a very sophisticated build system as well as a pure
typescript approach to development where javascript third party plugins
cannot be used.

But progress-up uses the progress loaders from
[loading.io](https://loading.io) which is written in javascript.

But I got this working by declaring the symbol in the plugin and linking
to the js source in the plugin usage.

## Code sample

Here is some template and typescript code.

```html
<div id="progress-up-progressArea"> 
  <div *ngFor="let info of uploadFileInfos;last as last;index as id" 
>
    <section class="m-4 p-4 mt-4 mb-4 transition-colors
    text-light-100 dark:text-white mx-auto">
     <div class="bg-dark dark:bg-gray dark:text-white rounded-md border border-red-800 rounded py-3 px-6
    border-gray-300 text-gray-600 dark:text-white relative">
    
      <div (click)="delItem(id)" title="Delete" class="absolute
    cursor-pointer top-0 right-0 mr-2 dark:bg-white" >
    	<img width="25" height="25" src="https://cdn.jsdelivr.net/gh/girish1729/progress-up/backend/public/assets/icons/misc/trash-icon.svg" />
      </div>
    
      <div class="flex flex-wrap -mx-2 mb-8">
          <!--first col -->
          <div class="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
             <div class="h-12 text-sm text-grey-dark flex items-left
    justify-left">
	       <div [ngSwitch] = "true">
                 <div *ngSwitchCase="info.file.type.includes('pdf')">
	       	<object [attr.data]="info.url" width="125px" height="125px"
    	       	type="application/pdf"></object>
	         </div>
                 <div *ngSwitchCase="info.file.type.includes('image')">
                      <img width="125" height="125" [src]="info.pic" 
	       	title="info.file.name" alt="info.file.name" class="w-12 h-12" />
	         </div>
                 <div *ngSwitchCase="info.file.type.includes('video')">
                           <video *ngIf="info.url" controls class="h-9 w-9" width="125" height="125">
	       	   <source [src]="info.url" title="info.file.name" 
	       	alt="info.file.name" >  </video> 
	         </div>
                 <div *ngSwitchCase="info.file.type.includes('audio')">
                           <audio *ngIf="info.url" controls class="h-9 w-9" width="125" height="125"> 
	       	   <source [src]="info.url" title="info.file.name" 
	       	alt="info.file.name" >  </audio> 
	         </div>
                 <div *ngSwitchCase="info.file.type.includes('text')">
                           <img width="125" height="125" [src]="info.pic" 
	       	[title]="info.title" alt="info.file.name" class="w-12 h-12" />
	         </div>
                 <div *ngSwitchDefault>
                           <img width="125" height="125" [src]="info.pic" 
	       	title="info.file.name" alt="info.file.name" class="w-12 h-12" />
	         </div>
               </div>

             </div>
          </div>
    
          <!--second col -->
          <div class="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div class="h-12 text-sm text-grey-dark flex items-left justify-left">
              <ul>
          	    <li  class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Name: {{info.file.name}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Date: {{info.ts}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Type: {{info.file.type}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Size: {{info.size}} 
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800 dark:text-white">
       	    <li class="font-light leading-relaxed text-gray-800
dark:text-white">
		    Metadata: {{info.meta}}
      	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800 dark:text-white">
		<span>{{info.bytesSent}} of {{info.size}} uploaded
{{info.rate}} MB/s ETA {{info.eta}} s</span>
          	    </li>
              </ul>
            </div>
           </div>
      </div>
          <div  class='ldBar bottom-0 right-0 pb-8' id="{{info.id}}" >
	   </div>
	   <span *ngIf="last">  {{createBars()}} </span>
      </div>
    </section>
  </div>
</div>
```

And some typescript.

```ts
    fileTypeIcons: {
        [key: string]: string
    } = {
        "video": "avi.svg",
        "css": "css.svg",
        "csv": "csv.svg",
        "eps": "eps.svg",
        "excel": "excel.svg",
        "html": "html.svg",
        "movie": "mov.svg",
        "mp3": "mp3.svg",
        "other": "other.svg",
        "pdf": "pdf.svg",
        "ppt": "ppt.svg",
        "rar": "rar.svg",
        "text": "txt.svg",
        "audio": "wav.svg",
        "word": "word.svg",
        "zip": "zip.svg"
    };


    filtFiles = {
        "type": "all",
        "action": "allow"
    };
    /* XXX these are backend variables */
    ///uploadURL = 'https://run.mocky.io/v3/dfc3d264-e2bc-41f9-82b9-23b0091c5e34';
    form = {
        uploadURL: '',
        filesName: "",
        authEnabled: false,
        authType: "Basic",
        user: '',
        pass: '',
        progType: 'Line',
        fileSizeLimit: 10,
        sizeLimitType: "Single file limit",
        fileTypeFilter: "All",
        fileTypeAction: "Allow file type"

    };

```



## How you can use the plugin?

{{<rawhtml>}}
<div class="flex justify-center">
<a href="https://angular-ivy-pu628h.stackblitz.io" class="bg-blue-200 rounded shadow-md text-black px-4 py-3 no-underline">Stackblitz </a>
</div>
{{</rawhtml>}}


The stackblitz link has the instructions and help needed.

In short, just installing using npm or yarn like this will get you
started.

```shell
	$ yarn install progress-up-angular
```

or

```shell
	$ npm install progress-up-angular
```

Then just put this inside the HTML source the tags needed and you are
done.

```html
	<progress-up></progress-up>
```

## Challenges

The plugin development had a lot of difficulties, but then the build
process and testing was very labor intensive since the linking involved
a lot of reinstalls.


