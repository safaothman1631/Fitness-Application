# Fix all merge conflicts by keeping HEAD version
$files = @(
    "app\api\users\[id]\route.ts",
    "app\api\users\route.ts",
    "app\dashboard\page.tsx",
    "app\giris\page.tsx",
    "app\login\admin\page.tsx",
    "app\login\owner\page.tsx",
    "app\login\patient\page.tsx",
    "app\login\physiotherapist\page.tsx",
    "app\login\superadmin\page.tsx",
    "app\login\trainer\page.tsx",
    "app\meals\page.tsx",
    "app\notifications\page.tsx",
    "app\owner\page.tsx",
    "app\patient-panel\page.tsx",
    "app\physio\page.tsx",
    "app\physiotherapist\patients\page.tsx",
    "app\physiotherapist\profile\page.tsx",
    "app\profile\dashboard\page.tsx",
    "app\profile\page.tsx",
    "app\progress\page.tsx",
    "app\settings\page.tsx",
    "app\superadmin\notifications\page.tsx",
    "app\superadmin\profile\page.tsx",
    "app\superadmin\settings\page.tsx",
    "app\superadmin\page.tsx",
    "app\user-dashboard\profile\page.tsx",
    "app\workout\page.tsx",
    "app\workouts\page.tsx",
    "components\subscription-guard.tsx",
    "components\subscription-warning.tsx",
    "lib\subscription.ts",
    "package-lock.json",
    "reset-all-passwords.js"
)

foreach ($file in $files) {
    $fullPath = Join-Path "C:\A" $file
    if (Test-Path $fullPath) {
        Write-Host "Fixing: $file"
        $content = Get-Content $fullPath -Raw
        
        # Remove conflict markers and keep HEAD version
        $pattern = '<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> [a-f0-9]{40}\r?\n?'
        $content = $content -replace $pattern, '$1'
        
        $content | Set-Content $fullPath -NoNewline
        Write-Host "Fixed: $file" -ForegroundColor Green
    }
}

Write-Host "`nAll conflicts resolved!" -ForegroundColor Green
