<?php
$a[]="123456";
$a[]="456789";
$a[]="233333";

$q=$_GET["q"];

if (strlen($q) > 0)
  {
  $hint="";
  for($i=0; $i<count($a); $i++)
    {
    if (strtolower($q)==strtolower(substr($a[$i],0,strlen($q))))
      {
      if ($hint=="")
        {
        $hint=$a[$i];
        }
      else
        {
        $hint=$hint." , ".$a[$i];
        }
      }
    }
  } else 
{
$hint==""
}

if ($hint == "")
  {
  $response="no results";
  }
else
  {
  $response="success";
  }

echo $response;
?>
