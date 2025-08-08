# count-lines.ps1

$excludeFolders = @("node_modules", ".next", ".git", "dist", "build", "public")
$extensions = @(".js", ".ts", ".jsx", ".tsx", ".css", ".html")




$files = Get-ChildItem -Recurse -File | Where-Object {
    foreach ($exclude in $excludeFolders) {
        if ($_.FullName -like "*\$exclude\*") { return $false }
    }
    # حذف فایل‌هایی که نامشون شامل [ یا ] هست
    if ($_.Name -match '[\[\]]') { return $false }
    return $_.Extension -in $extensions
}

$totalLines = 0
foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw
        $lineCount = ($content -split "`n").Count
        $totalLines += $lineCount
    }
    catch {
        Write-Host "Warning: Could not read file $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nTotal Lines of Code: $totalLines`n"
