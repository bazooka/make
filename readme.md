
<p align="center">
  <img src="https://raw.githubusercontent.com/bazooka/make/main/media/bm.png" alt="Bazooka Make" width="750">
</p>

<p align="center">
  <b>Bazooka Make</b> is a scaffolding tool for generating generic components in an existing project.
  <br>
  The generated files can be any language.
</p>

## Installation

```
npm i @bazooka_se/make
```

Add a script entry to your `package.json` file:

```json
"scripts": {
    "make": "bazooka-make"
}
```

Run the script and follow instruction to generate a new component:

```sh
npm run make
```

## Setup

To get started, create a directory in your project root called `templates` with directories for each template inside it. _Template directory name can be changed in settings, see below._

Example directory structure:
```
/templates
    /component
    /container
```

### Global settings

An optional settings file can be created in your project root to change some settings. Create a file called `bazooka.make.json` and add your settings as an object:

```json
{
    "templates_dir": "templates"
}
```

#### Supported settings

The following values are supported at the moment:

| Key | Default | Type | Description |
|---|---|---|---|
|`templates_dir`|`templates`|_String_|Directory where templates are located|

## Templates

A template can contain both files and directories. Empty directories are ignored.

See example templates [here](https://github.com/bazooka/make/tree/main/templates/).

### Template data

The templates will be passed data that can be accessed in both files and filenames. Currently the only data passed is the name you enter, together with case convertions, see below.

Use the following syntax to access the passed data:

```sh
# In a filename
[%name%]
[%name.toScreamingSnakeCase%]
```

```sh
# Inside a file
<% name %>
<% name.toDashedCase %>
```
Available case conversions

|  | Example | Note |
| - | - | - |
| `toUpperCamelCase` | UpperCamelCase | Same as default |
| `toLowerCamelCase` | lowerCamelCase | |
| `toDashedCase` | dashed-case | |
| `toKebabCase` | kebab-case | Same as dashedCase |
| `toSnakeCase` | snake_case | |
| `toScreamingSnakeCase` | SNAKE_CASE | |

## Filenames

All files must have the file ending `.template` to be included.

### Filename examples

| Template | Result |
| --- | --- |
| `index.js.template` | `index.js` |
| `[%name%].module.scss.template` | `ComponentName.module.scss` |

### Template settings

Each template directory can have a `.settings` file that supports the following settings:

| Setting | Default | Description |
| --- | --- | --- |
| `destination` | `null` | This is generated from selected template by default. |
| `new_folder` | `false` | Set to false to place template content in the root of destination folder. |
| `prompt_subfolder` | `true` | Set to true if destination folder has subfolders where generated component should be placed. |

```json
{
    "destination": "tests/",
    "prompt_subfolder": true,
    "new_folder": false
}
```
<sub><i>Example `.settings` file.</i></sub>
