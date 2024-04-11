<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/account.css">
    <script src="/assets/js/cart.js"></script>
    <script src="/assets/js/account.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>    
        <?php require_once("../../includes/header.php"); ?>
    </header>
    <main>
        <div class="container">
            <span id="globalMessage"></span>
            <div class="account-container">
                <div class="my-account">
                    <div class="user-information highlight">
                        <span>Moji podatci</span>
                    </div>
                    <div class="user-address">
                        <span>Moja adresa</span>
                    </div>
                    <div class="user-orders">
                        <span>Moje narudžbe</span>
                    </div>
                </div>
                <div class="my-information active">
                    <div class="user-data">
                        <label for="first-name">Ime</label>
                        <input type="text" name="first-name" id="first-name" required>
                        <span id="fnameErr"></span>
                        <br>
                        <label for="last-name">Prezime</label>
                        <input type="text" name="last-name" id="last-name" required>
                        <span id="lnameErr"></span>
                        <br>
                        <label for="email">E-mail</label>
                        <input type="text" name="email" id="email" required>
                        <span id="emailErr"></span>
                        <br>
                        <input type="button" id="user-data-submit" value="Spremi">
                    </div>
                    <div class="user-change-password">
                        <label for="old-password">Trenutna lozinka</label>
                        <input type="password" name="old-password" id="old-password" required>
                        <span id="oldPassErr"></span>
                        <br>
                        <label for="new-password">Nova lozinka</label>
                        <input type="password" name="new-password" id="new-password" required>
                        <span id="newPassErr"></span>
                        <br>
                        <label for="confirm-new-password">Ponovi novu lozinku</label>
                        <input type="password" name="confirm-new-password" id="confirm-new-password" required>
                        <span id="confPassErr"></span>
                        <br>
                        <input type="button" id="user-password-change" value="Promijeni lozinku">
                    </div>
                </div>
                <div class="my-address">
                    <label for="address">Adresa</label>
                    <input class="" id="address" name="address" type="text" value="" maxlength="255">
                    <span id="addressErr"></span>
                    <br>
                    <label for="city">Grad</label>
                    <input class="" id="city" name="city" type="text" maxlength="50" value="">
                    <span id="cityErr"></span>
                    <br>
                    <label for="postal-code">Poštanski broj</label>
                    <select class="" id="postal-code" name="postal-code">
                        <option value="Izaberite poštanski broj">Izaberite poštanski broj</option><option value="10000">10000</option><option value="10010">10010</option><option value="10020">10020</option><option value="10040">10040</option><option value="10090">10090</option><option value="10104">10104</option><option value="10105">10105</option><option value="10108">10108</option><option value="10109">10109</option><option value="10110">10110</option><option value="10135">10135</option><option value="10172">10172</option><option value="10250">10250</option><option value="10255">10255</option><option value="10257">10257</option><option value="10290">10290</option><option value="10291">10291</option><option value="10292">10292</option><option value="10295">10295</option><option value="10297">10297</option><option value="10298">10298</option><option value="10310">10310</option><option value="10315">10315</option><option value="10340">10340</option><option value="10342">10342</option><option value="10360">10360</option><option value="10361">10361</option><option value="10362">10362</option><option value="10370">10370</option><option value="10380">10380</option><option value="10410">10410</option><option value="10413">10413</option><option value="10414">10414</option><option value="10430">10430</option><option value="10431">10431</option><option value="10435">10435</option><option value="10437">10437</option><option value="10450">10450</option><option value="10451">10451</option><option value="10454">10454</option><option value="20000">20000</option><option value="20207">20207</option><option value="20210">20210</option><option value="20215">20215</option><option value="20221">20221</option><option value="20222">20222</option><option value="20223">20223</option><option value="20225">20225</option><option value="20230">20230</option><option value="20232">20232</option><option value="20235">20235</option><option value="20236">20236</option><option value="20240">20240</option><option value="20244">20244</option><option value="20246">20246</option><option value="20250">20250</option><option value="20260">20260</option><option value="20270">20270</option><option value="20271">20271</option><option value="20290">20290</option><option value="20340">20340</option><option value="20350">20350</option><option value="20355">20355</option><option value="21000">21000</option><option value="21203">21203</option><option value="21204">21204</option><option value="21210">21210</option><option value="21212">21212</option><option value="21214">21214</option><option value="21217">21217</option><option value="21220">21220</option><option value="21222">21222</option><option value="21225">21225</option><option value="21230">21230</option><option value="21232">21232</option><option value="21233">21233</option><option value="21236">21236</option><option value="21238">21238</option><option value="21240">21240</option><option value="21250">21250</option><option value="21256">21256</option><option value="21260">21260</option><option value="21270">21270</option><option value="21276">21276</option><option value="21300">21300</option><option value="21310">21310</option><option value="21311">21311</option><option value="21315">21315</option><option value="21320">21320</option><option value="21327">21327</option><option value="21330">21330</option><option value="21400">21400</option><option value="21405">21405</option><option value="21412">21412</option><option value="21420">21420</option><option value="21425">21425</option><option value="21430">21430</option><option value="21450">21450</option><option value="21460">21460</option><option value="21465">21465</option><option value="21469">21469</option><option value="21480">21480</option><option value="21485">21485</option><option value="22000">22000</option><option value="22202">22202</option><option value="22211">22211</option><option value="22213">22213</option><option value="22222">22222</option><option value="22232">22232</option><option value="22233">22233</option><option value="22234">22234</option><option value="22235">22235</option><option value="22236">22236</option><option value="22240">22240</option><option value="22243">22243</option><option value="22300">22300</option><option value="22320">22320</option><option value="22323">22323</option><option value="23000">23000</option><option value="23205">23205</option><option value="23206">23206</option><option value="23210">23210</option><option value="23212">23212</option><option value="23222">23222</option><option value="23223">23223</option><option value="23232">23232</option><option value="23233">23233</option><option value="23234">23234</option><option value="23235">23235</option><option value="23241">23241</option><option value="23242">23242</option><option value="23244">23244</option><option value="23248">23248</option><option value="23250">23250</option><option value="23271">23271</option><option value="23273">23273</option><option value="23281">23281</option><option value="23283">23283</option><option value="23284">23284</option><option value="23286">23286</option><option value="23287">23287</option><option value="23291">23291</option><option value="23292">23292</option><option value="23293">23293</option><option value="23294">23294</option><option value="23295">23295</option><option value="23296">23296</option><option value="23312">23312</option><option value="23420">23420</option><option value="23422">23422</option><option value="23440">23440</option><option value="23450">23450</option><option value="31000">31000</option><option value="31200">31200</option><option value="31207">31207</option><option value="31226">31226</option><option value="31300">31300</option><option value="31326">31326</option><option value="31400">31400</option><option value="31431">31431</option><option value="31500">31500</option><option value="31540">31540</option><option value="31550">31550</option><option value="31551">31551</option><option value="32000">32000</option><option value="32100">32100</option><option value="32236">32236</option><option value="32242">32242</option><option value="32249">32249</option><option value="32252">32252</option><option value="32257">32257</option><option value="32270">32270</option><option value="32284">32284</option><option value="33000">33000</option><option value="33405">33405</option><option value="33410">33410</option><option value="33515">33515</option><option value="33520">33520</option><option value="34000">34000</option><option value="34310">34310</option><option value="34340">34340</option><option value="34550">34550</option><option value="35000">35000</option><option value="35212">35212</option><option value="35214">35214</option><option value="35220">35220</option><option value="35222">35222</option><option value="35250">35250</option><option value="35252">35252</option><option value="35400">35400</option><option value="35410">35410</option><option value="35420">35420</option><option value="35430">35430</option><option value="40000">40000</option><option value="40313">40313</option><option value="40315">40315</option><option value="40320">40320</option><option value="40323">40323</option><option value="42000">42000</option><option value="42202">42202</option><option value="42204">42204</option><option value="42208">42208</option><option value="42220">42220</option><option value="42223">42223</option><option value="42230">42230</option><option value="42240">42240</option><option value="42243">42243</option><option value="42250">42250</option><option value="43000">43000</option><option value="43240">43240</option><option value="43270">43270</option><option value="43280">43280</option><option value="43290">43290</option><option value="43500">43500</option><option value="44000">44000</option><option value="44010">44010</option><option value="44210">44210</option><option value="44250">44250</option><option value="44317">44317</option><option value="44320">44320</option><option value="44330">44330</option><option value="44400">44400</option><option value="44410">44410</option><option value="44430">44430</option><option value="44440">44440</option><option value="47000">47000</option><option value="47220">47220</option><option value="47240">47240</option><option value="47250">47250</option><option value="47280">47280</option><option value="47300">47300</option><option value="48000">48000</option><option value="48214">48214</option><option value="48260">48260</option><option value="48316">48316</option><option value="48350">48350</option><option value="49000">49000</option><option value="49210">49210</option><option value="49216">49216</option><option value="49217">49217</option><option value="49218">49218</option><option value="49221">49221</option><option value="49223">49223</option><option value="49225">49225</option><option value="49231">49231</option><option value="49240">49240</option><option value="49243">49243</option><option value="49246">49246</option><option value="49250">49250</option><option value="49252">49252</option><option value="49282">49282</option><option value="49284">49284</option><option value="49290">49290</option><option value="51000">51000</option><option value="51211">51211</option><option value="51215">51215</option><option value="51216">51216</option><option value="51217">51217</option><option value="51218">51218</option><option value="51224">51224</option><option value="51226">51226</option><option value="51250">51250</option><option value="51260">51260</option><option value="51262">51262</option><option value="51280">51280</option><option value="51300">51300</option><option value="51306">51306</option><option value="51326">51326</option><option value="51410">51410</option><option value="51415">51415</option><option value="51417">51417</option><option value="51500">51500</option><option value="51511">51511</option><option value="51523">51523</option><option value="51550">51550</option><option value="51552">51552</option><option value="51556">51556</option><option value="51557">51557</option><option value="51561">51561</option><option value="51562">51562</option><option value="52000">52000</option><option value="52100">52100</option><option value="52207">52207</option><option value="52210">52210</option><option value="52220">52220</option><option value="52333">52333</option><option value="52341">52341</option><option value="52420">52420</option><option value="52424">52424</option><option value="52440">52440</option><option value="52460">52460</option><option value="52466">52466</option><option value="52470">52470</option><option value="53000">53000</option><option value="53202">53202</option><option value="53220">53220</option><option value="53230">53230</option><option value="53234">53234</option><option value="53250">53250</option><option value="53260">53260</option><option value="53270">53270</option><option value="53288">53288</option><option value="53291">53291</option>
                    </select>
                    <span id="postalErr"></span>
                    <br>
                    <label for="phone-number">Broj telefona</label>
                    <input class="" id="phone-number" name="phone-number" type="text" value="" inputtype="numeric" maxlength="15" oninput="this.value = this.value.replace(/[^0-9+]/g, '');">
                    <span id="phoneErr"></span>
                    <br>
                    <input type="button" id="user-address-change" value="Promijeni">
                </div>
                <div class="my-orders">
                    <div class="orders-table"></div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php"); ?>
    </footer>
</body>
</html>