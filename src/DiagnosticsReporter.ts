﻿import { Logger } from "./Logger";

import ts = require( "typescript" );
import chalk = require( "chalk" );

export class DiagnosticsReporter {
    private errors: ts.Diagnostic[];

    constructor( errors: ts.Diagnostic[] ) {
        this.errors = errors;
    }

    public reportDiagnostics() {
        var diagnostics = this.errors;

        for ( var i = 0; i < diagnostics.length; i++ ) {
            this.reportDiagnostic( diagnostics[i] );
        }
    }

    private reportDiagnostic( diagnostic: ts.Diagnostic ) {
        var output = "";

        if ( diagnostic.file ) {
            var loc = ts.getLineAndCharacterOfPosition( diagnostic.file, diagnostic.start );

            output += chalk.gray( `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): ` );
        }

        var category = chalk.red( ts.DiagnosticCategory[diagnostic.category].toLowerCase() );
        output += `${ category } TS${ chalk.red( diagnostic.code + '' ) }: ${ chalk.grey( ts.flattenDiagnosticMessageText( diagnostic.messageText, "\n" ) ) }`;

        Logger.log( output );
    }
} 