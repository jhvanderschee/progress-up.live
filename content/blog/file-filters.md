---
title: "File type filters for progress-up"
date: 2018-11-28T15:15:26+10:00
featureImage: filters.webp
draft: false
weight: 3
---

# File MIME type and size filters

The filtering capability of progress-up is meant for situations where
due to policy or other reasons you want to restrict only images or
videos or a combination thereof.

Currently only these file types are supported. In future there could be
more added.

- PDF only
- Image only
- Video only
- Audio only
- Zip only
- Text only

You could also specify the file size accepted globally or per file.

In addition to above MIME filters you could also either accept a
particular file type or deny a particular file type.

The files that are not scheduled for upload are shown with a red
background below the list of files that match the upload condition.

	          

## The filtering logic

The filtering UI and code are rather simple.

You can easily setup the file filters using the config tab.

The filter is active only during the file select stage.

The banned files are shown in the file preview below the list of queued
files.

The reason for disallowing upload is also shown in the preview.

## How to setup?

By default all filtering is disabled.

But you can easily disallow or allow certain file types.

The granularity is not very fine.

For instance you cannot ban only mp4 files, but you can ban video files.

Also more than one MIME type cannot be selected in the filter.
