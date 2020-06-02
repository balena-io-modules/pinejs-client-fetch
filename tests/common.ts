export type AnyObject = Dictionary<any>;

export interface Dictionary<T> {
	[index: string]: T;
}
