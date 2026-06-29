/**
 * La creazione di questa interfaccia garantissce che DetectionService non dipenda da un classificatore specifico.
 * Questa scelta costituisce l'implementazione dello strategy pattern.
 */
export interface Classifier {

  // meteodo classify che riceve in input data = dati di traffico.
  // deve essere comune a qualunque calssificatore (alternativo a RuleBasedClassifier) che si vuole applicare
  classify(data: any): string;
}