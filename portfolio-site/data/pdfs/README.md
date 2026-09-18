Taruh file PDF asli di folder ini, dengan nama file yang sama persis
dengan field "file" di data/publications.json.

Folder ini SENGAJA berada di luar /public — supaya PDF tidak punya
URL langsung yang bisa diakses browser. PDF hanya bisa diambil lewat
route /api/pdf/[slug], yang membaca file ini dari server dan
mengirimkannya ke viewer.
