#!/usr/bin/env python3
"""
Extract the values the fibre table needs from the Anses Ciqual table.

Usage:
    python3 tools/extract-ciqual.py "Table Ciqual 2025_FR_2025_11_03.xlsx"

Input: the Ciqual Excel file, downloaded from Recherche Data Gouv
(https://doi.org/10.57745/RDMHWY, Etalab Open Licence 2.0). It is not kept in
the repository. Requires openpyxl.

Reads the food codes listed in src/data/foods.json and writes
src/data/ciqual-values.json: fibre, water and energy per 100 g for each code,
with the source and licence. Run it again when Anses publishes a new version,
then update CIQUAL_SOURCE below.

A value Ciqual gives as "traces" or "< x" is stored as 0 with the original
text kept in "fibreRaw"; a missing value ("-") stops the script, because a
food without a fibre value cannot be listed.
"""
import json
import pathlib
import re
import sys

import openpyxl

ROOT = pathlib.Path(__file__).resolve().parent.parent
FOODS = ROOT / "src" / "data" / "foods.json"
OUT = ROOT / "src" / "data" / "ciqual-values.json"

CIQUAL_SOURCE = {
    "name": "Anses. Table de composition nutritionnelle des aliments Ciqual 2025",
    "version": "2025-11-03",
    "url": "https://doi.org/10.57745/RDMHWY",
    "licence": "Licence Ouverte / Open Licence 2.0 (Etalab)",
    "licenceUrl": "https://www.etalab.gouv.fr/licence-ouverte-open-licence/",
}

# Column headers in the Ciqual sheet (line breaks removed).
COLUMNS = {
    "code": "alim_code",
    "name": "alim_nom_fr",
    "kcal": "Energie, Règlement UE N° 1169 2011 (kcal 100 g)",
    "water": "Eau (g 100 g)",
    "fibre": "Fibres alimentaires (g 100 g)",
}


def number(raw):
    """Ciqual numbers use a decimal comma; "traces" and "< x" mean below the quantification limit."""
    text = str(raw).strip() if raw is not None else "-"
    if text == "-":
        return None, text
    if text == "traces" or text.startswith("<"):
        return 0.0, text
    return float(text.replace(",", ".")), None


def main(xlsx):
    wanted = {food["code"] for food in json.loads(FOODS.read_text(encoding="utf-8"))}
    sheet = openpyxl.load_workbook(xlsx, read_only=True).worksheets[0]
    rows = sheet.iter_rows(values_only=True)
    header = [re.sub(r"\s+", " ", str(h or "")).replace("/", " ").strip() for h in next(rows)]
    index = {key: header.index(label) for key, label in COLUMNS.items()}

    foods = {}
    for row in rows:
        code = str(row[index["code"]])
        if code not in wanted:
            continue
        entry = {"nameFr": " ".join(str(row[index["name"]]).split())}
        for key in ("fibre", "water", "kcal"):
            value, raw = number(row[index[key]])
            if value is None and key == "fibre":
                sys.exit(f"{code} {entry['nameFr']}: no fibre value in Ciqual")
            entry[key] = value
            if raw and key == "fibre":
                entry["fibreRaw"] = raw
        foods[code] = entry

    missing = sorted(wanted - foods.keys())
    if missing:
        sys.exit(f"codes not found in Ciqual: {', '.join(missing)}")
    OUT.write_text(
        json.dumps({"source": CIQUAL_SOURCE, "foods": dict(sorted(foods.items()))}, ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8",
    )
    print(f"{len(foods)} foods written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
