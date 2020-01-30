# organogram [![Maintainability](https://api.codeclimate.com/v1/badges/cac7483270e9fae75e17/maintainability)](https://codeclimate.com/github/timgentry/organogram/maintainability)
Displays an organogram using a radial Reingold–Tilford tree

## Installation

Download the latest release from https://github.com/timgentry/organogram/releases, extract the archive and then open the file `dist/organogram.html` in a browser.

Or install it yourself by cloning the project, then execute:

    $ yarn install
    $ yarn start

## Usage

Drag and drop an Excel (xlsx) spreadsheet anywhere on the page in the browser and you will be asked to specify the following fields, from the list of populated column names in the spreadsheet:

* **Reference** - column uniquely identifying staff members which is also used in the **Reports To** column, could be a ESR number, email adress, etc
* **Reports To** - column identifying the staff member's line manager
* **Label** - column identifying the staff member's label on the organogram, could be their name or role
* **Pay Grade** - column identifying the staff member's pay grade. The example currently copes with AfC and Civil Service pay grades.
* **Size** - column identifying the size of the staff member's dot on the organogram. Typically their WTE or weekly hours.

Once selected, click Generate to generate the organogram.

If successful, you will be able to download the organogram as an SVG or PDF (with a choice of page sizes).

## Contributing

1. Fork it ( https://github.com/timgentry/organogram/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
