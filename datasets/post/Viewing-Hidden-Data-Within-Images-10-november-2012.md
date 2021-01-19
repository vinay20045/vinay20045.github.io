Viewing Hidden Data Within Images
---------------------------------
##### Last Updated: 10 November, 2012 | First Published: 10 November, 2012

Recently I had a requirement to extract location data from an image into which geo code was embedded. In the course of completing this task I wrote a small script that will extract all the exif data from the image. I could extract meaningful information out of JPEG or TIFF images using the script.

Exif means Exchangeable image file format. You can read more about it [here][1]. It basically consists of image file specification format (and sound file spec format). Many modern day cameras, scanners, other devices and image creation software embed more and more information about the image within the image itself using Exif (and many other formats).

I've used PHP to write the script. I've largely used $_FILES[], $_SERVER[] and EXIF_READ_DATA() to extract most of the information. For those of you who are curious to do this here is the sample code. Feel free to adapt it to your needs.

To print all the exif data embedded in the file:

    <?php
    $exif_data = exif_read_data(< image_location_or_url >);

    foreach ($exif_data as $key => $content){
        if(is_array($content)){
            foreach ($content as $name => $value){
                echo "$key --> $name --> $value";
            }
        }
        else {
            echo "$key --> $content";
        }
    }
    ?>

If you want to pick out any information individually you can get the required value by using the key like:

    <?php
    $exif_data = exif_read_data(< image_location_or_url >);

    $copyright_info = $exif_data["COMPUTED"]["Copyright"];
    echo "Copyright Information: $copyright_info";        //Prints blank if the queried info is not available

    $camera_make = $exif_data["Make"];
    $camera_model = $exif_data["Model"];
    echo "This image was captured using $camera_make, $camera_model";
    ?>

Of course more information can be extracted from an image by reading the XMP (Extensible Metadata Platform) data that might be embedded in the image. I will write a script with support for extracting XMP data and support for more image types soon.


[1]: http://en.wikipedia.org/wiki/Exchangeable_image_file_format "Wikipedia article on Exif data"