<?php

$path = getcwd() . '/app';
$stringKeys = [];
$functions = [
  'trans',
  'trans_choice',
  'Lang::get',
  'Lang::choice',
  'Lang::trans',
  'Lang::transChoice',
  '@lang',
  '@choice',
  '__',
  '$trans.get',
];

$stringPattern =
    "[^\w]".                                       // Must not have an alphanum before real method
    '('.implode('|', $functions).')'.              // Must start with one of the functions
    "\(\s*".                                       // Match opening parenthesis
    "(?P<quote>['\"])".                            // Match " or ' and store in {quote}
    "(?P<string>(?:\\\k{quote}|(?!\k{quote}).)*)". // Match any string that can be {quote} escaped
    "\k{quote}".                                   // Match " or ' previously matched
    "\s*[\),]";                                    // Close parentheses or new parameter

// Find all files in the app folder
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
$files = [];
while($it->valid()) {
  if (!$it->isDot()) {
    $files[$it->key()] = $it->key();
  }

  $it->next();
}

foreach ($files as $file) {
  if (preg_match_all("/$stringPattern/siU", file_get_contents($file), $matches)) {
    foreach ($matches['string'] as $key) {
      $stringKeys[] = $key;
    }
  }
}

$stringKeys = array_unique($stringKeys);
sort($stringKeys);

$json = [];
foreach ($stringKeys as $string) {
  $json[$string] = '[your-translation-here]';
}
$output = json_encode($json, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_UNICODE);
$fp = fopen('translation.json', 'w');
fwrite($fp, $output);
fclose($fp);

// Load translations
$languages = ['sv'];
// $translations = [];
foreach ($languages as $language) {
  $translations[$language] = json_decode(file_get_contents(getcwd() . '/app/languages/' . $language . '.json'), true);
}

?>

<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>App translation strings</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>

<div class="container">
  <h1>Translation strings</h1>
  <table class="table table-striped table-sm">
    <?php foreach($stringKeys as $string): ?>
      <tr>
        <td><?php echo $string; ?></td>
        <?php foreach ($languages as $language): ?>
          <td>
            <?php if (isset($translations[$language][$string])): ?>
              <?php echo $translations[$language][$string]; ?>
            <?php else: ?>
              <b>NOT TRANSLATED</b>
            <?php endif; ?>
          </td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </table>
</div>

</body>
</html>