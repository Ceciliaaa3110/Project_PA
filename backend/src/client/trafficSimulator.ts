import fs from "fs";
import csv from "csv-parser";
import axios from "axios";

const API_URL = "http://localhost:3000/api/detection";

const FILES = ["trafficDatasets/dos.csv"];


const MAX_ROWS_PER_FILE = 20;
const MAX_SCAN_ROWS_PER_FILE = 5000;

function convertToNumber(value: any): number {
    
    if (value === undefined || value === null || value === "") {
        return 0;
    }   

    const cleaned = value
        .toString()
        .replace(/,/g, "")
        .replace(",", ".");  
    
    const numberValue = Number(cleaned);

    if (isNaN(numberValue)) {
        return 0;
    }

    return numberValue;
}

function generateIp(index: number): string {
    return "192.168.1." + index;
}

function getValue(row: any, columName: string): any {
    
    const normalize = (text: string) => text.replace(/\s/g, "").toLowerCase();
    
    const key = Object.keys(row).find(
        k => k.trim() === columName
    );
    return key ? row[key] : undefined;
}

function createTrafficRequest(row: any, index: number, filepath: string) {
    
    return {
        sourceIp: generateIp(index),
        packets: convertToNumber(getValue(row, "Flow Packets/s")),
        bytes: convertToNumber(getValue(row, "Flow Bytes/s")),
        synPacketsCount: convertToNumber(getValue(row, "SYN Flag Count")),
    };
}

function readTrafficFile(filePath: string): Promise<any[]> {
    return new Promise((resolve) => {
        const rows: any[] = [];

        fs.createReadStream(filePath)
            .pipe(csv({ separator: ";" }))
            .on("data", (row) => {
                
                /*if (rows.length === 0) {
                    console.log(Object.keys(row));
                    console.log(row);
                }*/
                
                if (rows.length < MAX_SCAN_ROWS_PER_FILE) {
                    rows.push(row);
                }
            })
            .on("end", () => {
                const shuffledRows = rows.sort(() => Math.random() - 0.5);
                resolve(shuffledRows.slice(0, MAX_ROWS_PER_FILE));
            });
    });
}

async function runSimulation() {
    let requestNumber = 1;

    for (const filePath of FILES) {

        const rows = await readTrafficFile(filePath);

        for (const row of rows) {

            const requestBody =
                createTrafficRequest(row, requestNumber, filePath);

            try {
                const response =
                    await axios.post(API_URL, requestBody);

                console.log("Richiesta", requestNumber);
                console.log("File:", filePath);
                console.log("Dati inviati:", requestBody);
                console.log("Risposta:", response.data);
                console.log("----------------");

            } catch (error: any) {

                console.log(
                    "Errore nella richiesta",
                    requestNumber
                );

                if (error.response) {
                    console.log(error.response.data);
                }
            }

            requestNumber++;
        }
    }

    console.log("Simulazione completata");
}

runSimulation();