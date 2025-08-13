import java.util.*;

public class FrequencyCounter {

    public static Map<Integer, Integer> getFrequency(int[] arr) {
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        try {
            if (arr == null) {
                throw new IllegalArgumentException(Input array cannot be null);
            }

            for (int num : arr) {
                frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
            }

        } catch (Exception e) {
            System.err.println(Error while processing array:  + e.getMessage());
        }
        return frequencyMap;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.print(Enter array size: );
            int size = sc.nextInt();
            int[] arr = new int[size];

            System.out.println(Enter  + size +  integers:);
            for (int i = 0; i < size; i++) {
                arr[i] = sc.nextInt();
            }

            Map<Integer, Integer> result = getFrequency(arr);
            System.out.println(result);

        } catch (Exception e) {
            System.err.println(Invalid input:  + e.getMessage());
        } finally {
            sc.close();
        }
    }
}
