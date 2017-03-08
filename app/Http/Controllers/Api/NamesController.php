<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class NamesController extends Controller
{
    public function getEnabled() {
        $json = json_decode(Storage::disk('public')->get('enabled.json'));

        return response()->json($json);
    }

    public function getDisabled() {
        $json = json_decode(Storage::disk('public')->get('disabled.json'));

        return response()->json($json);
    }

    public function saveEnabled(Request $request) {
        $json_string = json_encode($request->input());

        if (isset($json_string)) {
            Storage::disk('public')->put('enabled.json', $json_string);
        } else {
            Storage::disk('public')->put('enabled.json', '{ "names": [] }');
        }

        return response()->json();
    }

    public function saveDisabled(Request $request) {
        $json_string = json_encode($request->input());

        if (isset($json_string)) {
            Storage::disk('public')->put('disabled.json', $json_string);
        } else {
            Storage::disk('public')->put('disabled.json', '{ "names": [] }');
        }

        return response()->json();
    }
}
